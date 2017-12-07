import tensorflow as tf
import numpy as np

# variables from graph
input_layer_node_count = 2 # Number of features
output_layer_node_count = 4 # Number of classes
number_of_hidden_layers = 2
hidden_layer1_node_count = 10
hidden_layer2_node_count = 10
hidden_layer3_node_count = 10
hidden_layer4_node_count = 10
hidden_layer5_node_count = 10
hidden_layer6_node_count = 10
hidden_layer7_node_count = 10
hidden_layer8_node_count = 10

def convert_into_one_hot(y_train,number_of_classes):
    onehot_y=[]
    for i in range(len(y_train)):
        temp = np.zeros(number_of_classes)
        temp[y_train[i]-1]=1
        onehot_y.append(temp)

    return onehot_y


def neural_network_model(data):
	