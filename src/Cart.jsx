import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from './Redux/action';
import { removeFromCart } from './Redux/action';

const Cart = () => {
  const [data, setData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartItem, setCartItem] = useState(0);
  const [isAdded, setIsAdded] = useState(false )
   
  const cartData = useSelector(state => state.reducer);


  useEffect(() => {
    setCartItem(cartData.length);
    let result = cartData.filter((element)=>{
      return element.name=== selectedItem.name
    })
    if(result.length){
      setIsAdded(true)
    }else{
      setIsAdded(false)
    }
  }, [cartData]);


  
  const dispatch = useDispatch();

  const StarFilled =
    'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';

  const getApiData = async () => {
    const url = 'https://fakestoreapi.com/products';
    let result = await fetch(url);
    result = await result.json();
    setData(result);
   
  };

  useEffect(() => {
    getApiData();
  }, []);


  const handleAddtoCart = (item) => {
   
    dispatch(addToCart(item));
  };

  const handleRemoveCart = (item) => {

    dispatch(removeFromCart(item.name))
   
  };

  

  return (
    <View style={styles.ContainerStyle}>
      <View style={styles.navbar}>
        <View style={styles.left} />
        <View style={styles.center}>
          <Text style={styles.title}>Shopping</Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity>
            <Text style={styles.cart}>Cart: {cartItem}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {data.length ? (
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
              <View key={item?.id}>
                <TouchableOpacity
                  style={styles.cardStyle}
                  onPress={() => {
                    setShowModal(true);
                    setSelectedItem(item);
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.ImageStyle}>
                      <Image
                        style={{width: 130, height: 180}}
                        source={{
                          uri: item?.image,
                        }}
                      />
                    </View>

                    <View style={{flex: 0.9, marginLeft: 17}}>
                      <Text style={styles.headingText}>{item?.title}</Text>
                      <View style={styles.starView}>
                        {Array.from(
                          {length: item?.rating?.rate},
                          (_, index) => (
                            <View key={index}>
                              <Image
                                style={styles.starStyle}
                                source={{uri: StarFilled}}
                              />
                            </View>
                          ),
                        )}
                      </View>
                      <Text style={styles.reviewText}>
                        Reviews: {item?.rating?.count}
                      </Text>
                      <Text style={styles.PriceText}>Rs. {item?.price}</Text>
                      <Text style={styles.categoryText}>
                        Category: {item?.category}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      ) : (
        <View style={styles.loadingView}>
          <Text style={styles.loadingText}>Loading!!</Text>
        </View>
      )}

      <Modal transparent={true} visible={showModal}>
        <View style={styles.CenteredStyle}>
          <View style={styles.modalImageStyle}>
            <Image
              style={{width: 180, height: 250}}
              source={{
                uri: selectedItem?.image,
              }}
            />
          </View>
          <View style={{marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text numberOfLines={10} style={styles.headingText}>
                Description:{' '}
                <Text style={styles.descriptionText}>
                  {selectedItem?.description}
                </Text>
              </Text>
            </View>
            <View style={{marginLeft: 17}}></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 10,
            }}>
          
          {
            isAdded ? <Button title='Remove from Cart' onPress={() => handleRemoveCart(selectedItem)}/> :
            <Button
            title="Add to Cart"
            color="red"
            onPress={() => handleAddtoCart(selectedItem)}
          />
          }

           
            <Button
              title="Close"
              onPress={() => setShowModal(false)}
              color="grey"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  ContainerStyle: {
    paddingLeft: 0,
    paddingRight: 5,
    paddingBottom: 100,
  },

  cardStyle: {
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 10,
    marginTop: 15,
    marginLeft: 12,
    marginRight: 12,
    borderColor: 'grey',
  },
  headerText: {
    marginTop: 50,
    color: 'black',
    textAlign: 'center',
    fontSize: 17,
  },
  headingText: {
    paddingBottom: 10,
    flexWrap: 'wrap',
    color: 'black',
    textAlign: 'center',
    fontSize: 17,
  },
  ImageStyle: {
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  PriceText: {
    marginTop: 5,
    paddingBottom: 5,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    color: 'black',
    textAlign: 'center',
    fontSize: 17,
  },
  categoryText: {
    paddingBottom: 10,
    flexWrap: 'wrap',
    color: 'grey',
    textAlign: 'center',
    fontSize: 13,
  },
  loadingView: {
    justifyContent: 'center',
    height: '100%',
  },
  loadingText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 17,
  },
  starView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starStyle: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },
  reviewText: {
    paddingTop: 10,
    flexWrap: 'wrap',
    color: 'grey',
    textAlign: 'center',
    fontSize: 13,
  },
  CenteredStyle: {
    marginTop: 150,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 10,
  },
  modalImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    color: 'black',
    fontSize: 17,
  },

  navbar: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#B4E380',
    paddingHorizontal: 20,
  },
  left: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cart: {
    fontSize: 16,
    color: 'black',
  },
});
