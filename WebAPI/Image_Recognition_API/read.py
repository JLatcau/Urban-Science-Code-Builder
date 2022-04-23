import cv2 as cv
import numpy as np
import io
import os
import shutil
import glob
import sys
import argparse
from PIL import Image, ImageDraw
from keras.models import load_model
import tensorflow as tf
import matplotlib.pyplot as plt
from matplotlib import cm
import imutils
from imutils.contours import sort_contours

# Letters registered as detectable
bVar = 'B'
gVar = 'G'
nVar = 'N'

# Creates dead space to write cell values
cellZ = ''

# Picks up the image from the user key
imdir = './ImageInput/'+sys.argv[1]
print(imdir)
images = []

# Clears text output
with open('Output/'+sys.argv[1]+'/output.txt', 'w') as f:
    f.write('')

# Imports image
for fileName in os.listdir(imdir):
    img = cv.imread(os.path.join(imdir, fileName))
    if img is not None:
        images.append(img)

if not images:
    with open('Output/'+sys.argv[1]+'/output.txt', 'w') as f:
        f.write('No Images Detected.')


# Loads custom CNN detection
model_path = 'model_v2'
print("Loading CNN model...")
model = load_model(model_path)
print("Done")


# img = images
img = images[0]

# # Resizes Image
resized = cv.resize(img, (553, 800))

# # Creates a blank image with original image scale
blank = np.zeros([553, 800], dtype='uint8')
blank.fill(255) # or img[:] = 255
blank = cv.resize(blank, (553, 800))

# # Converts to grayscale
gray = cv.cvtColor(resized, cv.COLOR_BGR2GRAY)

# # Blurs the image
blur = cv.bilateralFilter(gray,9,15,75)

# # Finds the Edges
edges = cv.Canny(blur, 125, 175)  

# # Finds the Contours
contours, hierarchies = cv.findContours(edges, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE)
# # print(f'{len(contours)} contour(s) found!')\

# # Displays detected Contours
cv.drawContours(blank, contours, -1, (0,0,255), 4)

cv.imwrite('WaitingRoom/Output.jpg',blank)

# Creates crop variable
cropped = blank
blurred = cv.GaussianBlur(cropped, (5, 5), 0)

# Detects contour of images for computer vision
edged = cv.Canny(blurred, 30, 250) #low_threshold, high_threshold
cnts = cv.findContours(edged.copy(), cv.RETR_EXTERNAL,cv.CHAIN_APPROX_SIMPLE)
cnts = imutils.grab_contours(cnts)
cnts = sort_contours(cnts, method="left-to-right")[0]

# Detects characters hidden in the contours
chars = []
# Loop over the contours
for c in cnts:
	# Compute the bounding box of the contour and isolate ROI
    (x, y, w, h) = cv.boundingRect(c)
    roi = cropped[y:y + h, x:x + w]
    
    # Binarize image, finds threshold with OTSU method
    thresh = cv.threshold(roi, 0, 255,cv.THRESH_BINARY_INV | cv.THRESH_OTSU)[1]
    
    # Resize largest dimension to input size
    (tH, tW) = thresh.shape
    if tW > tH:
        # Calculate the ratio for the new height (new width / old width = scalar)
        r = 28 / float(tW)
        rescaledHeight = int(r * tH)

        # If new height is 0, skip this contour (otherwise opencv.resize() will throw an assertion)
        if rescaledHeight == 0:
            continue

        thresh = imutils.resize(thresh, width=28)
    # Otherwise, resize along the height
    else:
        # Calculate the ratio for the new width (new height / old height = scalar)
        r = 28 / float(tH)
        rescaledWidth = int(r * tW)

        # If new width is 0, skip this contour (otherwise opencv.resize() will throw an assertion)
        if rescaledWidth == 0:
            continue

        thresh = imutils.resize(thresh, height=28)

    # Find how much is needed to pad
    (tH, tW) = thresh.shape
    dX = int(max(0, 28 - tW) / 2.0)
    dY = int(max(0, 28 - tH) / 2.0)
    # Pad the image and force 28 x 28 dimensions
    padded = cv.copyMakeBorder(thresh, top=dY, bottom=dY,
        left=dX, right=dX, borderType=cv.BORDER_CONSTANT,
        value=(0, 0, 0))
    padded = cv.resize(padded, (28, 28))
    # Reshape and rescale padded image for the model
    padded = padded.astype("float32") / 255.0
    padded = np.expand_dims(padded, axis=-1)

    # Append image and bounding box data in char list
    chars.append((padded, (x, y, w, h)))


boxes = [b[1] for b in chars]
chars = np.array([c[0] for c in chars], dtype="float32")

# OCR the characters using the handwriting recognition model
preds = model.predict(chars)

# Define the list of label names
labelNames = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


cropped = img[:,:]
cropped = cv.resize(cropped, (553, 800))

# # # Isolates detected characters and outputs any detected registered characters and their location
for (pred, (x, y, w, h)) in zip(preds, boxes):
	# Find the index of the label with the largest corresponding
	# Probability, then extract the probability and label
    i = np.argmax(pred)
    prob = pred[i]
    label = labelNames[i]

    # Prints all detected characters into console
    if prob>= .5:
        print(label)

    # Checks if probability is over 75% then outputs character and cell location into text
    if prob >= .75:
        if bVar == label:
            print('Bar Chart')

            avgX = ((x+w))
            avgY = ((y+h))

            print(str(avgX)+','+str(avgY))

            if(avgX<226 and avgY<267):
                cellZ='0 0'
            elif(avgX>226 and avgY<267):
                cellZ='0 1'
            elif(avgX<226 and avgY>267 and avgY<533):
                cellZ='1 0'
            elif(avgX>226 and avgY>267 and avgY<533):
                cellZ='1 1'
            elif(avgX<226 and avgY>533):
                cellZ='2 0'
            elif(avgX>226 and avgY>533):
                cellZ='2 1'

            with open('Output/'+sys.argv[1]+'/output.txt', 'a') as f:
                f.write('{}'.format(bVar+' '))
                f.write(cellZ+'\n')

    if prob >= .50:
        if gVar==label:
            print('Data Grid')
        
            avgX = ((x+w))
            avgY = ((y+h))

            print(str(avgX)+','+str(avgY))

            if(avgX<226 and avgY<267):
                cellZ='0 0'
            elif(avgX>226 and avgY<267):
                cellZ='0 1'
            elif(avgX<226 and avgY>267 and avgY<533):
                cellZ='1 0'
            elif(avgX>226 and avgY>267 and avgY<533):
                cellZ='1 1'
            elif(avgX<226 and avgY>533):
                cellZ='2 0'
            elif(avgX>226 and avgY>533):
                cellZ='2 1'

            with open('Output/'+sys.argv[1]+'/output.txt', 'a') as f:
                f.write('{}'.format(gVar+' '))
                f.write(cellZ+'\n')

    if prob >= .50:
        if nVar==label:
            print('KPI')
        
            avgX = ((x+w))
            avgY = ((y+h))

            print(str(avgX)+','+str(avgY))

            if(avgX<226 and avgY<267):
                cellZ='0 0'
            elif(avgX>226 and avgY<267):
                cellZ='0 1'
            elif(avgX<226 and avgY>267 and avgY<533):
                cellZ='1 0'
            elif(avgX>226 and avgY>267 and avgY<533):
                cellZ='1 1'
            elif(avgX<226 and avgY>533):
                cellZ='2 0'
            elif(avgX>226 and avgY>533):
                cellZ='2 1'

            with open('Output/'+sys.argv[1]+'/output.txt', 'a') as f:
                f.write('{}'.format(nVar+' '))
                f.write(cellZ+'\n')
    
    label_text = f"{label},{prob * 100:.1f}%"
    cv.rectangle(cropped, (x, y), (x + w, y + h), (0,255 , 0), 2)
    cv.putText(cropped, label_text, (x - 10, y - 10),cv.FONT_HERSHEY_SIMPLEX,0.5, (0,255, 0), 1)

# # Remove comment for 2 lines below to see output of detections
# cv.imshow('Contours Drawn', cropped)
# cv.waitKey(0)

# Clears the input folder
dir = 'ImageInput/'+sys.argv[1]
for f in os.listdir(dir):
    os.remove(os.path.join(dir, f))