import tensorflow as tf
import numpy as np

# variables from graph
input_layer_node_count = 2 # Number of features
output_layer_node_count = 4 # Number of classes
number_of_hidden_layers = 1
hidden_layer1_node_count = 10


def convert_into_one_hot(y_train,number_of_classes):
    onehot_y=[]
    for i in range(len(y_train)):
        temp = np.zeros(number_of_classes)
        temp[y_train[i]-1]=1
        onehot_y.append(temp)

    return onehot_y


def neural_network_model(data):

	input_params = {'weights':tf.Variable(tf.random_normal([input_layer_node_count, hidden_layer1_node_count])),
                      'biases':tf.Variable(tf.random_normal([hidden_layer1_node_count]))}

    output_params = {'weights':tf.Variable(tf.random_normal([hidden_layer1_node_count, output_layer_node_count])),
                      'biases':tf.Variable(tf.random_normal([output_layer_node_count]))}



    input_layers = tf.add(tf.matmul(data,input_params['weights']), input_params['biases'])
    input_layers = tf.nn.relu(input_layers)

    output_layers = tf.matmul(input_layers,output_params['weights']) + output_params['biases']
 	return output_layers



def train_neural_network(x,y,train_x,train_y):

    prediction = neural_network_model(x)
    cost = tf.reduce_mean( tf.nn.softmax_cross_entropy_with_logits(logits=prediction, labels=y) )
    optimizer = tf.train.AdamOptimizer().minimize(cost)
    
    with tf.Session() as sess:

        sess.run(tf.global_variables_initializer())
        for epoch in range(hm_epochs):
            epoch_loss = 0
            i=0
            while i < len(x_train):
                start = i
                end = i+batch_size
                batch_x = np.array(x_train[start:end])
                batch_y = np.array(y_train[start:end])

                _, c = sess.run([optimizer, cost], feed_dict={x: batch_x,
                                                              y: batch_y})
                epoch_loss += c
                i+=batch_size
                
            print('Epoch', epoch+1, 'completed out of',hm_epochs,'loss:',epoch_loss)

        correct = tf.equal(tf.argmax(prediction, 1), tf.argmax(y, 1))

        accuracy = tf.reduce_mean(tf.cast(correct, 'float'))
        print('Accuracy:',accuracy.eval({x:mnist.test.images, y:mnist.test.labels}))



def main():


    # user set variables
    batch_size = 100
    learning_rate=0.01
    hm_epochs = 10

    """ training data """                x_train= ____                                                       
    """ labels for training data """     y_train= ____                                      
    """converting labels to one hot """  y_train= convert_into_one_hot(y_train,output_layer_node_count)

    x = tf.placeholder('float', [None, input_layer_node_count])
    y = tf.placeholder('float', [None, output_layer_node_count])


    train_neural_network(x,y,x_train,y_train,batch_size,learning_rate,hm_epochs)

