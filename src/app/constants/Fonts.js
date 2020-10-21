import {responsiveHeight} from '@utils/DimenUtils';
const type = {
  ionicons: 'ionicons',
  materialIcons: 'Material-Icons',
  materialIconsRegular: 'MaterialIcons-Regular',
  robotoBold: 'Roboto-Bold',
  robotoItalic: 'Roboto-Italic',
  robotoLight: 'Roboto-Light',
  robotoMedium: 'Roboto-Medium',
  robotoMediumItalic: 'Roboto-MediumItalic',
  robotoRegular: 'Roboto-Regular',
  robotoThin: 'Roboto-Thin',
  awesomeRegular: 'FontAwesome5ProRegular',
  awesomeSolid: 'FontAwesome5ProSolid',
  awesomeLight: 'FontAwesome5ProLight',

  regular: 'HelveticaNeue-Regular',
  bold: 'HelveticaNeue-Bold',
  heavy: 'HelveticaNeue-Heavy',
  italic: 'HelveticaNeue-Italic',
  medium: 'HelveticaNeue-Medium',
  light: 'HelveticaNeue-Light',
};

const size = {
  tiny: responsiveHeight(11),
  small: responsiveHeight(12),
  medium: responsiveHeight(13),
  text: responsiveHeight(15),
  giant: responsiveHeight(17),
  h4: responsiveHeight(16),
  h3: responsiveHeight(20),
  h2: responsiveHeight(24),
  h1: responsiveHeight(28),
  title: responsiveHeight(18),
  newText: responsiveHeight(14),
};

export default {
  type,
  size,
};
