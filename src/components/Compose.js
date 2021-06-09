import React from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import EmojiSelector from 'react-native-emoji-selector';

// icons
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';

// constants
import {COLORS, FONTS} from '../constants';

const width = (Dimensions.get('screen').width * 95) / 100 - 110;

const Compose = props => {
  const [emojiKb, setEmojiKb] = React.useState(false);

  return (
    <View style={style.container}>
      <View style={style.wrapper}>
        <TouchableOpacity onPress={() => setEmojiKb(!emojiKb)}>
          <IconSLI style={style.icon} name="emotsmile" />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconSLI style={style.icon} name="paper-clip" />
        </TouchableOpacity>
        <TextInput
          style={style.input}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          multiline={true}
        />
        <TouchableOpacity onPress={props.send}>
          <IconSLI
            style={[style.icon, {color: COLORS.primary}]}
            name="arrow-up-circle"
          />
        </TouchableOpacity>
      </View>
      <Modal transparent={true} visible={emojiKb}>
        <View style={style.input_canvas}>
          <View style={style.close_btn}>
            <TouchableOpacity onPress={() => setEmojiKb(!emojiKb)}>
              <IconSLI style={style.icon} name="close" />
            </TouchableOpacity>
          </View>
          <SafeAreaView style={style.emoji_kb}>
            <EmojiSelector onEmojiSelected={emoji => console.log(emoji)} />
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    minHeight: 64,
    maxHeight: 192,
    backgroundColor: COLORS.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.gray_3,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 24,
  },
  wrapper: {
    width: '95%',
    height: 'auto',
    minHeight: 42,
    maxHeight: 126,
    maxWidth: '95%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    alignItems: 'center',
    borderRadius: 21,
    borderWidth: 1,
    borderColor: COLORS.slate_1,
  },
  icon: {
    width: 24,
    height: 24,
    fontSize: 24,
    minWidth: 24,
    minHeight: 24,
    maxWidth: 24,
    maxHeight: 24,
    color: COLORS.slate_2,
  },
  input: {
    fontFamily: FONTS.font_regular,
    color: COLORS.gray_2,
    width: width,
    maxWidth: width,
    height: 'auto',
    minHeight: 42,
    maxHeight: 126,
  },
  input_canvas: {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    backgroundColor: COLORS.white,
    flexDirection: 'column',
  },
  close_btn: {
    flex: 1,
    padding: 5,
  },
  emoji_kb: {
    flex: 9,
  },
});

export default Compose;
