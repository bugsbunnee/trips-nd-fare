import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import ImagePicker from '@/src/components/ui/ImagePicker';

interface Props {
    imageUris: string[];
    onAddImage: (imageUri: string) => void;
    onRemoveImage: (imageUri: string) => void;
}

const AppImagePickerList: React.FC<Props> = ({ imageUris = [], onRemoveImage, onAddImage }) => {
  const scrollView = useRef<ScrollView>(null);

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current?.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImagePicker
                imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}
          
          <ImagePicker imageUri='' onChangeImage={(uri) => onAddImage(uri as string)} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});

export default AppImagePickerList;
