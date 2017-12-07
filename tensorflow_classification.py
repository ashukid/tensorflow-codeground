import tensorflow as tf
import numpy as np

# variables from graph
number_of_classes= 2
number_of_features= 4 # x1,x2,x3.....x100
number_of_hidden_layers= 2
hidden_layers_neurons_size=[10,10]



def convert_into_one_hot(y_train,number_of_classes):
    onehot_y=[]
    for i in range(len(y_train)):
        temp = np.zeros(number_of_classes)
        temp[y_train[i]-1]=1
        onehot_y.append(temp)

    return onehot_y


def neural_network_model(data):

    hidden_layers_neurons_size.insert(0,number_of_features)
    hidden_layer=[]

    for i in range(0,number_of_hidden_layers):
        temp={'weights':tf.Variable(tf.random_normal([hidden_layers_neurons_size[i],hidden_layers_neurons_size[i+1]])),
                        'biases':tf.Variable(tf.random_normal([hidden_layers_neurons_size[i+1]]))}
        hidden_layer.append(temp)



    output_layer = {'weights':tf.Variable(tf.random_normal([hidden_layers_neurons_size[i], number_of_classes])),
                    'biases':tf.Variable(tf.random_normal([number_of_classes])),}


    layer=[data]
    temp=tf.add(tf.matmul(data,hidden_layer[0]['weights']), hidden_layer[0]['biases'])
    temp=tf.nn.relu(l1)
    layer.append(temp)

    for i in range(0,number_of_hidden_layers):
        temp=tf.add(tf.matmul(layer[i],hidden_layer[i]['weights']), hidden_layer[i]['biases'])
        temp=tf.nn.relu(temp)
        layer.append(temp)

    output = tf.matmul(layer[i],output_layer['weights']) + output_layer['biases']
    return output




def train_neural_network(x,train_x,train_y):

    prediction = neural_network_model(x)
    cost = tf.reduce_mean( tf.nn.softmax_cross_entropy_with_logits(logits=prediction, labels=y) )
    optimizer = tf.train.AdamOptimizer().minimize(cost)
    
    with tf.Session() as sess:

        sess.run(tf.global_variables_initializer())
        for epoch in range(hm_epochs):
            epoch_loss = 0
            i=0
            while i < len(train_x):
                start = i
                end = i+batch_size
                batch_x = np.array(train_x[start:end])
                batch_y = np.array(train_y[start:end])

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
    """converting labels to one hot """  y_train= convert_into_one_hot(y_train,number_of_classes)

    x = tf.placeholder('float', [None, number_of_features])
    y = tf.placeholder('float', [None, number_of_classes])


    train_neural_network(x,y,x_train,y_train,batch_size,learning_rate,hm_epochs)

