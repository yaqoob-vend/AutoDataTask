import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {Fragment} from 'react';
import {scale} from 'react-native-size-matters';
import {colors} from '../theme/colors';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

interface ScreenProps {
  title: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  children: React.ReactNode;
}

const Screen: React.FC<ScreenProps> = ({
  title,
  showBackButton = false,
  rightComponent,
  children,
}) => {
  const navigation = useNavigation();

  const onBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Fragment>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          {showBackButton || rightComponent ? (
            <View style={styles.buttonContainer}>
              {showBackButton && (
                <TouchableOpacity
                  onPress={onBackPress}
                  style={styles.backButton}>
                  <Feather name="chevron-left" size={22} color="white" />
                </TouchableOpacity>
              )}

              <View style={{alignItems: 'flex-end'}}>{rightComponent}</View>
            </View>
          ) : null}

          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      </SafeAreaView>

      <View style={styles.container}>{children}</View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  safeArea: {backgroundColor: colors.primary},
  header: {
    backgroundColor: colors.primary,
  },
  headerTitle: {
    fontSize: scale(16),
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: scale(12),
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: scale(12),
    zIndex: 1,
  },
  backButton: {width: scale(28)},
});

export default Screen;
