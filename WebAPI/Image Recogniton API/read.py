import cv2 as cv
import numpy as np
from google.cloud import vision
import io
import os
import shutil
import glob

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="C:\\Users\\Dess\\Desktop\\keyFile.json"
client = vision.ImageAnnotatorClient()\

bVar = 'B'
gVar = 'G'
nVar = 'N'


bFile = 'DataChartCode/BarChart.html'
gFile = 'DataChartCode/DataGrid.html'
nFile = 'DataChartCode/KPI.html'

source_files='Output/*.html'
target_folder='DataChartCode'
target_folder2='Output'

# retrieve file list
filelist=glob.glob(source_files)
for single_file in filelist:
     # move file with full paths as shutil.move() parameters
    shutil.move(single_file,target_folder) 

# # Pulls Image
img = cv.imread('ImageInput/B.jpg')

# # Resizes Image
resized = cv.resize(img, (595, 842))

# # Creates a blank image with original image scale
blank = np.zeros([595, 842], dtype='uint8')
blank.fill(255) # or img[:] = 255

# # Converts to grayscale
gray = cv.cvtColor(resized, cv.COLOR_BGR2GRAY)
cv.imshow('Gray', resized)

# # Blurs the image
blur = cv.bilateralFilter(gray,9,75,75)

# # Finds the Edges
edges = cv.Canny(blur, 125, 175)
cv.imshow('Edges', edges)

# # Finds the Contours
contours, hierarchies = cv.findContours(edges, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE)
# # print(f'{len(contours)} contour(s) found!')\

# # Displays detected Contours
cv.drawContours(blank, contours, -1, (0,0,255), 4)

# # Converts back to RGB
blank = cv.cvtColor(blank, cv.COLOR_BGR2RGB)

# # Creates Bounding Boxes
for cntr in contours:
    area = cv.contourArea(cntr)
    if area > 10 and area < 100:
        x,y,w,h = cv.boundingRect(cntr)
        cv.rectangle(blank, (x, y), (x+w, y+h), (0,255,0), 2)

cv.imshow('Contours Drawn', blank)
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

with open('Output/output.txt', 'w') as f:
    f.write('')

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


cv.waitKey(0)


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