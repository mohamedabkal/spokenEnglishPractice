import { Button, ButtonText, Input, InputField, ScrollView, Select, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectInput, SelectItem, SelectPortal, SelectTrigger, Text, View } from '@gluestack-ui/themed';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default DetailPage = ({navigation}) => {
  

  const handleNext = () => {
    navigation.navigate('Address')
  }
  
  const selectItemsRender = () => {
    return (<ScrollView style={{width: '100%'}}>
      {Array.from({ length: 2024 - 1970 }, (_, index) => 2023 - index).map(year => {
        return (<SelectItem key={`graduation_year_${year}`} label={`${year}`} value={year} />)
      })}
    </ScrollView>)
  }

  return (
      <KeyboardAwareScrollView style={styles.area}>
        <View style={styles.inner}>
          <Input variant="primary" style={styles.input}>
            <InputField  placeholder="University/Institution Name" ref={universityRef}/>
          </Input>
          
          <Select style={styles.input} ref={undergraduateAdmissionYearRef}>
            <SelectTrigger variant="primary" size="md">
              <SelectInput  placeholder="Undergraduate Admission Year" />
            </SelectTrigger>
            <SelectPortal>
              
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                  <Text style={{fontSize: 18, marginTop: 16, color: '#777'}}>Select Graduation Year</Text>
                </SelectDragIndicatorWrapper>

                {selectItemsRender()}
              </SelectContent>
            </SelectPortal>
          </Select>

          <Select style={styles.input} ref={graduationYearRef}>
            <SelectTrigger variant="primary" size="md">
              <SelectInput  placeholder="Graduation Year" />
            </SelectTrigger>
            <SelectPortal>
              
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                  <Text style={{fontSize: 18, marginTop: 16, color: '#777'}}>Select Graduation Year</Text>
                </SelectDragIndicatorWrapper>

                {selectItemsRender()}
              </SelectContent>
            </SelectPortal>
          </Select>
          
          <Input variant="primary" style={styles.input}>
            <InputField  placeholder="Department" ref={departmentRef}/>
          </Input>
          
          <Input variant="primary" style={styles.input}>
            <InputField keyboardType='numeric' placeholder="Height" ref={heightRef}/>
            <Text style={styles.unit}>ft</Text>
          </Input>
          
          <Input variant="primary" style={styles.input}>
            <InputField keyboardType='numeric' placeholder="Weight" ref={weightRef}/>
            <Text style={styles.unit}>Kg</Text>
          </Input>

          <Button variant='secondary' onPress={handleNext}>
            <ButtonText>Next</ButtonText>
          </Button>
        </View>
      </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  area: {
    backgroundColor:'white'
  },
  inner: {
    padding: 24,
    backgroundColor:'white'
  },
  input: {
    marginBottom: 20,
  },
  unit: {
    lineHeight: 40,
    marginRight: 15,
    color: 'gray'
  }
})
