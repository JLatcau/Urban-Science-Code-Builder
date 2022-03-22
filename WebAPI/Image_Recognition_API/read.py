import cv2 as cv
import numpy as np
from google.cloud import vision
import io
import os
import shutil
import glob
import sys

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="keyFile.json"
client = vision.ImageAnnotatorClient()\

bVar = 'B'
gVar = 'G'
nVar = 'N'


bFile = 'DataChartCode/BarChart.html'
gFile = 'DataChartCode/DataGrid.html'
nFile = 'DataChartCode/KPI.html'
# outputPic = 'WaitingRoom/output.jpg'
# outputText = 'WaitingRoom/output.txt'
# step1 = 'WaitingRoom/GrayScale(1).jpg'
# step2 = 'WaitingRoom/Blur(2).jpg'
# step3 = 'WaitingRoom/Edges(3).jpg'
# step4 = 'WaitingRoom/Contours(4).jpg'
# step5 = 'WaitingRoom/BoundedBox(5).jpg'


source_files='Output/*.html'
source_files2='Output/*.jpg'
# source_files3='WaitingRoom/*.jpg'
target_folder='DataChartCode'
target_folder2='Output'
# target_folder3='WaitingRoom'


# # retrieve file list
# filelist=glob.glob(source_files2)
# for single_file in filelist:
#      # move file with full paths as shutil.move() parameters
#     shutil.move(single_file,target_folder3) 


# retrieve file list
filelist=glob.glob(source_files)
for single_file in filelist:
     # move file with full paths as shutil.move() parameters
    shutil.move(single_file,target_folder) 


imdir = './ImageInput/'+sys.argv[1]
print(imdir)
images = []

with open('Output/output.txt', 'w') as f:
    f.write('')

for fileName in os.listdir(imdir):
    img = cv.imread(os.path.join(imdir, fileName))
    if img is not None:
        images.append(img)

if not images:
    with open('Output/output.txt', 'w') as f:
        f.write('No Images Detected.')

# img = images
img = images[0]

# # Resizes Image
resized = cv.resize(img, (553, 800))

# # Creates a blank image with original image scale
blank = np.zeros([595, 842], dtype='uint8')
blank.fill(255) # or img[:] = 255
blank = cv.resize(blank, (553, 800))

# # Converts to grayscale
gray = cv.cvtColor(resized, cv.COLOR_BGR2GRAY)
cv.imwrite('Output/GrayScale(1).jpg', gray)

# # Blurs the image
blur = cv.bilateralFilter(gray,9,15,75)
cv.imwrite('Output/Blur(2).jpg', blur)

# # Finds the Edges
edges = cv.Canny(blur, 125, 175)
cv.imwrite('Output/Edges(3).jpg', edges)

# # Finds the Contours
contours, hierarchies = cv.findContours(edges, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE)
# # print(f'{len(contours)} contour(s) found!')\

# # Displays detected Contours
cv.drawContours(blank, contours, -1, (0,0,255), 4)
cv.imwrite('Output/Contours(4).jpg', blank)

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
cv.imwrite('Output/BoundedBox(5).jpg', blank2)

cv.imwrite('Output/output.jpg', blank)


with io.open('Output/output.jpg', 'rb') as image_file:
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
        
        vertices = (['({},{})'.format(vertex.x, vertex.y)
            for vertex in text.bounding_poly.vertices])

        with open('Output/output.txt', 'a') as f:
            f.write('Texts: \n{}\n'.format(text.description))
            f.write('Bounds: \n{}\n'.format(','.join(vertices)))

        filelist=glob.glob(bFile)
        for single_file in filelist:
        # move file with full paths as shutil.move() parameters
            shutil.move(single_file,target_folder2) 

    if gVar==text.description:
        print('Data Grid')
        vertices = (['({},{})'.format(vertex.x, vertex.y)
            for vertex in text.bounding_poly.vertices])

        with open('Output/output.txt', 'a') as f:
            f.write('Texts: \n{}\n'.format(text.description))
            f.write('Bounds: \n{}\n'.format(','.join(vertices)))

        filelist=glob.glob(gFile)
        for single_file in filelist:
        # move file with full paths as shutil.move() parameters
            shutil.move(single_file,target_folder2) 

    if nVar==text.description:
        print('KPI')
        vertices = (['({},{})'.format(vertex.x, vertex.y)
            for vertex in text.bounding_poly.vertices])

        with open('Output/output.txt', 'a') as f:
            f.write('Texts: \n{}\n'.format(text.description))
            f.write('Bounds: \n{}\n'.format(','.join(vertices)))

        filelist=glob.glob(nFile)
        for single_file in filelist:
        # move file with full paths as shutil.move() parameters
            shutil.move(single_file,target_folder2) 

    # else:
    #     print('None Detected')
    #     with open('output.txt', 'w') as f:
    #         f.write('None Detected')

dir = 'ImageInput/'+sys.argv[1]
for f in os.listdir(dir):
    os.remove(os.path.join(dir, f))

# # pytesseract.tesseract_cmd = "C:\\Program Files\\Tesseract-OCR\\tesseract.exe"

# # Pulls Image
# img = cv.imread('Photos/test2.jpg')

# # Resizes Image
# resized = cv.resize(img, (595, 842))

# # Creates a blank image with original image scale
# blank = np.zeros(img.shape, dtype='uint8')

# # Converts to grayscale
# gray = cv.cvtColor(resized, cv.COLOR_BGR2GRAY)
# cv.imshow('Gray', resized)

# # Finds the Edges
# edges = cv.Canny(resized, 125, 175)
# # cv.imshow('Edges', edges)

# # Creates thresh variable
# ret, thresh = cv.threshold(gray, 125, 255, cv.THRESH_BINARY)
# # cv.imshow('Threshold', thresh)

# # Finds the Contours
# contours, hierarchies = cv.findContours(edges, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE)
# # print(f'{len(contours)} contour(s) found!')\

# # Displays detected Contours
# cv.drawContours(blank, contours, -1, (0,0,255), 1)
# # cv.imshow('Contours Drawn', blank)

# # # Detects Words
# # words_in_image = pytesseract.image_to_string(gray, config='--psm 10 --oem 3 -c tessedit_char_whitelist=0123456789')

# # print(words_in_image)

# cv.waitKey(0)