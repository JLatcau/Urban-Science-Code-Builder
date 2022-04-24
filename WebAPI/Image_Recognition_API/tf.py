import tensorflow as tf
from tensorflow import keras
import numpy as np
import pandas as pd
from keras import optimizers
from keras.optimizers import rmsprop_v2,adam_v2
from keras.preprocessing.image import ImageDataGenerator
from sklearn.model_selection import train_test_split

print(tf.__version__)

# This dataset is only loaded in to allow the custom dataset to be formatted properly
mnist = keras.datasets.mnist
(train_images_mnist,train_labels_mnist),(test_images_mnist,test_labels_mnist) = mnist.load_data()
train_images_mnist = np.reshape(train_images_mnist,(train_images_mnist.shape[0],28,28,1))  
test_images_mnist = np.reshape(test_images_mnist,(test_images_mnist.shape[0],28,28,1))

AZ_data = pd.read_csv('data/AZ_Handwritten_Data.csv',header = None)
# One column labels values while the other contains 28 x 28 images
AZ_labels = AZ_data.values[:,0]
AZ_images = AZ_data.values[:,1:]
# Images are reshaped for use by Keras
AZ_images = np.reshape(AZ_images,(AZ_images.shape[0],28,28,1))  


test_size = float(len(test_labels_mnist))/len(train_labels_mnist)
print(f'test set size: {test_size}')
train_images_AZ, test_images_AZ, train_labels_AZ, test_labels_AZ = train_test_split(AZ_images,AZ_labels, test_size=test_size)


# Concatenate datasets
train_images = train_images_AZ
train_labels = train_labels_AZ
test_images = test_images_AZ
test_labels = test_labels_AZ


print('Data has been prepared')


optim = tf.compat.v1.keras.optimizers.RMSprop(learning_rate=1e-4)

model = tf.keras.models.Sequential([
    # Makes it 150 x 150
    tf.keras.layers.Conv2D(32, (3,3), activation='relu', input_shape=(28, 28, 1)),
    tf.keras.layers.MaxPooling2D(2,2),
    tf.keras.layers.Conv2D(32, (3,3), activation='relu'),
    tf.keras.layers.MaxPooling2D(2,2), 
    # Flatten the results to feed into a CNN
    tf.keras.layers.Flatten(), 
    # 512 neuron hidden layer
    tf.keras.layers.Dense(512, activation='relu'), 
    # Only 1 output neuron. 
    tf.keras.layers.Dense(len(np.unique(train_labels)), activation='softmax')  
])

model.compile(optimizer=optim,
              loss='sparse_categorical_crossentropy',
              metrics = ['accuracy'])

model.summary()

train_datagen = ImageDataGenerator(
      rescale=1./255,
      rotation_range=15,
      width_shift_range=0.1,
      height_shift_range=0.1,
      shear_range=0.1,
      zoom_range=0.2,
      horizontal_flip=False,
      fill_mode='nearest')

test_datagen = ImageDataGenerator(rescale=1./255)

train_generator = train_datagen.flow(train_images, train_labels, batch_size=50, shuffle=True)
validation_generator = test_datagen.flow(test_images, test_labels, batch_size=50, shuffle=True)

history = model.fit(
      train_generator,
      steps_per_epoch=500,  
      epochs=64,
      validation_data=validation_generator,
      validation_steps=50,  
      verbose=2)
model.save('model_v2')