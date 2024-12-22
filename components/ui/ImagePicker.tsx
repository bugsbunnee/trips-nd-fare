import React, { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { View, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from '@/components/ui';

import { colors, icons } from '@/constants';

interface Props {
    imageUri: string;
    onChangeImage: (imageUri: string | null) => void;
}

const AppImagePicker: React.FC<Props> = ({ imageUri, onChangeImage }) => {
    useEffect(() => {
        requestPermission();
    }, []);

    const requestPermission = async () => {
        const { granted }= await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) alert("You need to enable permission to access the library.");
    };

    const selectImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                quality: 1,
            });
    
            if (!result.canceled) onChangeImage(result.assets[0].uri);
        } catch (error) {
            console.log("Error reading an image", error);
        }
    };

    const handlePress = () => {
        if (!imageUri) selectImage();
        else
          Alert.alert("Delete", "Are you sure you want to delete this image?", [
            { text: "Yes", onPress: () => onChangeImage(null) },
            { text: "No" },
          ]);
    };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {imageUri 
                    ? <Image src={imageUri} style={styles.image} /> 
                    : <Ionicons name='camera' size={icons.SIZES.X_LARGE} color={colors.light.gray} />}
            </View>
            
            <View style={styles.edit}>
                <Ionicons name='image' size={icons.SIZES.SMALL} color={colors.light.primary}  />
            </View>
        </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 110,
    borderRadius: 110,
    borderWidth: 2,
    backgroundColor: colors.light.borderLight,
    borderColor: colors.light.white,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: '100%',
    height: "100%",
    borderRadius: 999
  },
  edit: { 
    width: 24, 
    height: 24,
    backgroundColor: colors.light.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 0
 }
});

export default AppImagePicker;
