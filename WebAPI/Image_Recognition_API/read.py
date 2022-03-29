import cv2 as cv
import numpy as np
from google.cloud import vision
import io
import os
import shutil
import glob
import sys
import argparse
from PIL import Image, ImageDraw

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="keyFile.json"
client = vision.ImageAnnotatorClient()

bVar = 'B'
gVar = 'G'
nVar = 'N'

imdir = './ImageInput/'+sys.argv[1]
print(imdir)
images = []

with open('Output/'+sys.argv[1]+'/output.txt', 'w') as f:
    f.write('')

for fileName in os.listdir(imdir):
    img = cv.imread(os.path.join(imdir, fileName))
    if img is not None:
        images.append(img)

if not images:
    with open('Output/'+sys.argv[1]+'/output.txt', 'w') as f:
        f.write('No Images Detected.')

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

# # Duplicates image for bounding box
blank2 = blank.copy()

# # Converts back to RGB
blank2 = cv.cvtColor(blank2, cv.COLOR_BGR2RGB)

# # Creates Bounding Boxes
for cntr in contours:
    area = cv.contourArea(cntr)
    if area > 10 and area < 100:
        x,y,w,h = cv.boundingRect(cntr)
        cv.rectangle(blank2, (x, y), (x+w, y+h), (0,255,0), 2)

cv.imwrite('Output/'+sys.argv[1]+'/output.jpg', blank)


with io.open('Output/'+sys.argv[1]+'/output.jpg', 'rb') as image_file:
        content = image_file.read()

image = vision.Image(content=content)

response = client.text_detection(image=image)
texts = response.text_annotations

if response.error.message:
    raise Exception(
        '{}\nError has occured'.format(
            response.error.message))

for text in texts:
    if bVar==text.description:
        print('Bar Chart')

        listX = ([vertex.x
            for vertex in text.bounding_poly.vertices])

        listY = ([vertex.y
            for vertex in text.bounding_poly.vertices])

        avgX = (sum(listX)/len(listX))
        avgY = (sum(listY)/len(listY))

        with open('Output/'+sys.argv[1]+'/output.txt', 'a') as f:
            f.write('{}'.format(text.description+' '))
            f.write(str(avgX)+' '+str(avgY)+'\n')

    if gVar==text.description:
        print('Data Grid')
        
        listX = ([vertex.x
            for vertex in text.bounding_poly.vertices])

        listY = ([vertex.y
            for vertex in text.bounding_poly.vertices])

        avgX = (sum(listX)/len(listX))
        avgY = (sum(listY)/len(listY))

        with open('Output/'+sys.argv[1]+'/output.txt', 'a') as f:
            f.write('{}'.format(text.description+' '))
            f.write(str(avgX)+' '+str(avgY)+'\n')

    if nVar==text.description:
        print('KPI')
        
        listX = ([vertex.x
            for vertex in text.bounding_poly.vertices])

        listY = ([vertex.y
            for vertex in text.bounding_poly.vertices])

        avgX = (sum(listX)/len(listX))
        avgY = (sum(listY)/len(listY))

        with open('Output/'+sys.argv[1]+'/output.txt', 'a') as f:
            f.write('{}'.format(text.description+' '))
            f.write(str(avgX)+' '+str(avgY)+'\n')

    # else:
    #     print('None Detected')
    #     with open('output.txt', 'w') as f:
    #         f.write('None Detected')

dir = 'ImageInput/'+sys.argv[1]
for f in os.listdir(dir):
    os.remove(os.path.join(dir, f))
