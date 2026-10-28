import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';

const PasswordSchema = Yup.object({
  passwordLength: Yup.number()
    .min(4, "Should be of minimum 4 characters")
    .max(16, "Should be of maximum 16 characters")
    .required("This is required")
})

const App = () => {

  const [password, setPassword] = useState("")
  const [isPassGenerated, setIsPassGenerated] = useState(false)
  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
    let charList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const numChars = '0123456789'
    const specialChars = '!@#$%^&*_+'

    if (upperCase) {
      charList += upperCaseChars
    }

    if (lowerCase) {
      charList += lowerCaseChars
    }

    if (numbers) {
      charList += numChars
    }

    if (symbols) {
      charList += specialChars
    }

    const passwordResult = createPassword(charList, passwordLength)

    setPassword(passwordResult)
    setIsPassGenerated(true)
  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const charIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(charIndex)
    }
    return result
  }

  const resetPasswordState = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={(values)=>{
              console.log(values);
              generatePasswordString(+values.passwordLength)    
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>{errors.passwordLength}</Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder='Write a number'
                    keyboardType='numeric'
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include lowercase</Text>
                  <View style={styles.checkboxContainer}>
                    <BouncyCheckbox
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor='black'
                      text=""
                    />
                  </View>
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase</Text>
                  <View style={styles.checkboxContainer}>
                    <BouncyCheckbox
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                      fillColor='black'
                      text=""
                    />
                  </View>
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include numbers</Text>
                  <View style={styles.checkboxContainer}>
                    <BouncyCheckbox
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor='black'
                      text=""
                    />
                  </View>
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Special Characters</Text>
                  <View style={styles.checkboxContainer}>
                    <BouncyCheckbox
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor='black'
                      text=""
                    />
                  </View>
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={() => handleSubmit()}
                  >
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}
                  >
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#F3F6FB',
  },

  formContainer: {
    margin: 16,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 24,
    textAlign: 'center',
  },

  subTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 8,
  },

  description: {
    color: '#64748B',
    fontSize: 14,
    marginBottom: 12,
  },

  heading: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },

  inputWrapper: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  inputColumn: {
    flexDirection: 'column',
    flex: 1,
    marginRight: 12,
  },

  checkboxContainer: {
    width: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  inputStyle: {
    padding: 12,
    width: '35%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    color: '#172554',
    textAlign: 'center',
  },

  errorText: {
    fontSize: 12,
    color: '#DC2626',
    marginTop: 5,
  },

  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },

  primaryBtn: {
    flex: 1,
    padding: 13,
    borderRadius: 10,
    marginRight: 8,
    backgroundColor: '#2563EB',
  },

  primaryBtnTxt: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },

  secondaryBtn: {
    flex: 1,
    padding: 13,
    borderRadius: 10,
    marginLeft: 8,
    backgroundColor: '#E2E8F0',
  },

  secondaryBtnTxt: {
    color: '#334155',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },

  card: {
    padding: 20,
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 20,
  },

  cardElevated: {
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  generatedPassword: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
    color: '#1D4ED8',
  },
});