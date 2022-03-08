import cv2 as cv
import numpy as np
# from pytesseract import pytesseract
from google.cloud import vision
import io
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="C:\\Users\\Dess\\Desktop\\keyFile.json"
client = vision.ImageAnnotatorClient()\

bVar = 'B'
dVar = 'D'
nVar = 'N'

# # Pulls Image
img = cv.imread('Photos/B.png')

# # Resizes Image
resized = cv.resize(img, (595, 842))

# # Creates a blank image with original image scale
blank = np.zeros([595, 842], dtype='uint8')
blank.fill(255) # or img[:] = 255

# # Converts to grayscale
gray = cv.cvtColor(resized, cv.COLOR_BGR2GRAY)
cv.imshow('Gray', resized)

# # Finds the Edges
edges = cv.Canny(resized, 125, 175)
cv.imshow('Edges', edges)

# # Finds the Contours
contours, hierarchies = cv.findContours(edges, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE)
# # print(f'{len(contours)} contour(s) found!')\

# # Displays detected Contours
cv.drawContours(blank, contours, -1, (0,0,255), 1)
cv.imshow('Contours Drawn', blank)
cv.imwrite('Photos/cat.jpg', blank)


with io.open('Photos/cat.jpg', 'rb') as image_file:
        content = image_file.read()

image = vision.Image(content=content)

response = client.document_text_detection(image=image)
texts = response.text_annotations
print('Texts:')

for text in texts:
    print('\n"{}"'.format(text.description))

    vertices = (['({},{})'.format(vertex.x, vertex.y)
        for vertex in text.bounding_poly.vertices])

    print('bounds: {}'.format(','.join(vertices)))

if response.error.message:
    raise Exception(
        '{}\nError has occured'.format(
            response.error.message))

for text in texts:
    if bVar==text.description:
        print('Bar Chart')
    if dVar==text.description:
        print('Data Sheet')
    if nVar==text.description:
        print('KPI')


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