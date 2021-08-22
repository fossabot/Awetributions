import React from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, ToastAndroid} from 'react-native';
import {View, Text, StyleSheet, Linking, Alert, Image, Vibration} from 'react-native';
import {Button, IconButton, TouchableRipple, useTheme as usePaperTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const packageJson = require('../../package.json');

const About: React.FC = () => {
    const {t} = useTranslation();
    const {colors: PaperColor} = usePaperTheme();

    const handleEasterEgg = () => {
        if (Platform.OS === 'android') {
            Vibration.vibrate(90);
            ToastAndroid.show('Made with ❤️ in Kunming', ToastAndroid.LONG);
        }
    };

    const checkVersion = () => {
        Alert.alert(t('About.AlertTitle'), '', [
            {text: t('About.AlertDismiss')},
            {
                text: t('About.AlertGo'),
                onPress: () => Linking.openURL('market://details?id=com.awetributions'),
            },
        ]);
    };

    interface TranslatorProops {
        language: string;
        translator: string;
    }

    const Translator: React.FC<TranslatorProops> = props => {
        const {language, translator} = props;
        return (
            <View style={styles.mid_description}>
                <Text style={[styles.header_description_codesign, {color: PaperColor.text}]}>
                    {language}
                </Text>
                <Text style={[styles.header_description_codesign, {color: PaperColor.text}]}>
                    {' - '}
                </Text>
                <Text style={[styles.header_description_codesign, {color: PaperColor.text}]}>
                    {translator}
                </Text>
            </View>
        );
    };

    return (
        <View style={[styles.root, {backgroundColor: PaperColor.background}]}>
            <View style={styles.header}>
                {/* <TouchableRipple
                    rippleColor={PaperColor.ripple}
                    borderless={true}
                    disabled={Platform.OS === 'android' ? false : true}
                    style={styles.header_btn}
                    onPress={() => {}}
                    onLongPress={() => handleEasterEgg()}>
                    <Image
                        source={require('../../assets/AppIcon/AppIconRound288.png')}
                        style={styles.header_img}
                    />
                </TouchableRipple> */}
                <IconButton
                    icon={() => (
                        <Ionicons name="flask-outline" size={40} color={PaperColor.textAccent} />
                    )}
                    color={PaperColor.textAccent}
                    size={40}
                    onPress={() => handleEasterEgg()}
                />
                <Text style={[styles.header_title, {color: PaperColor.text}]}>
                    {t('About.Awetributions')}
                </Text>
                <View style={styles.header_description}>
                    <Text style={[styles.header_description_ver, {color: PaperColor.text}]}>
                        {t('About.Version')}
                    </Text>
                    <Text style={[styles.header_description_ver, {color: PaperColor.text}]}>
                        {packageJson.version}
                    </Text>
                    <Text style={[styles.header_description_ver, {color: PaperColor.text}]}>
                        {`(${packageJson.awetributionsBuild})`}
                    </Text>
                </View>
                <View style={styles.header_description}>
                    <Text style={[styles.header_description_codesign, {color: PaperColor.text}]}>
                        {t('About.Codesign')}
                    </Text>
                    <Text style={[styles.header_description_codesign, {color: PaperColor.text}]}>
                        {' - '}
                    </Text>
                    <Text style={[styles.header_description_codesign, {color: PaperColor.text}]}>
                        GeniuSven
                    </Text>
                </View>
                <View style={styles.mid}>
                    <Translator language={t('About.en')} translator="GeniuSven" />
                    <Translator language={t('About.zh-Hans')} translator="GeniuSven" />
                    <Translator language={t('About.zh-Hant')} translator="GeniuSven" />
                </View>
            </View>
            <View style={styles.footer}>
                <Button
                    theme={{
                        roundness: 10,
                    }}
                    onPress={() => checkVersion()}>
                    {t('About.Check_for_Updates')}
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: 24,
        paddingBottom: 32,
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
    },
    header_btn: {
        borderRadius: 72,
    },
    header_img: {
        width: 72,
        height: 72,
    },
    header_title: {
        marginTop: 16,
    },
    header_description: {
        flexDirection: 'row',
        marginTop: 4,
    },
    header_description_ver: {
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    header_description_codesign: {
        fontSize: 10,
        fontWeight: 'bold',
    },

    mid: {
        marginTop: 32,
        alignItems: 'center',
    },
    mid_description: {
        flexDirection: 'row',
        marginTop: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default About;
