import {
  Button,
  ButtonText,
  Input,
  InputField,
  ScrollView,
  Select,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  View,
} from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { updateProfile } from "../../../store/profile";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  mobile_number: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  university_institution_name: yup.string().required("University is required"),
  undergraduate_admission_year: yup
    .number()
    .required("Undergraduate Admission Year is required"),
  graduate_year: yup.number().required("Graduate Year is required"),
  department: yup.string().required("Department is required"),
  height: yup.number().required("Height is required"),
  weight: yup.number().required("Weight is required"),
});

export default StartPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      mobile_number: "",
      university_institution_name: "",
      undergraduate_admission_year: new Date().getFullYear(),
      graduate_year: new Date().getFullYear(),
      department: "",
      height: 0,
      weight: 0,
    },
  });

  const handleNext = (formData) => {
    console.log(formData);

    dispatch(
      updateProfile({
        first_name: formData.first_name,
        last_name: formData.last_name,
        mobile_number: formData.mobile_number,
        university_institution_name: formData.university_institution_name,
        undergraduate_admission_year: formData.undergraduate_admission_year,
        graduation_year: formData.graduation_year,
        department: formData.department,
        height: formData.height,
        weight: formData.weight,
      })
    );

    navigation.navigate("Address");
  };

  const selectItemsRender = () => {
    return (
      <ScrollView style={{ width: "100%" }}>
        {Array.from({ length: 2024 - 1970 }, (_, index) => 2023 - index).map(
          (year) => {
            return (
              <SelectItem
                key={`graduation_year_${year}`}
                label={`${year}`}
                value={year}
              />
            );
          }
        )}
      </ScrollView>
    );
  };

  return (
    <KeyboardAwareScrollView style={styles.area}>
      <View style={styles.inner}>
        {/* First Name */}
        <Text style={styles.label}>First Name</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input variant="primary" style={styles.input}>
              <InputField
                placeholder="First Name"
                onChangeText={onChange}
                value={value}
              />
            </Input>
          )}
          name="first_name"
        />
        {errors.first_name && (
          <Text style={styles.error}>{errors.first_name.message}</Text>
        )}

        {/* Last Name */}
        <Text style={styles.label}>Last Name</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input variant="primary" style={styles.input}>
              <InputField
                placeholder="Last Name"
                onChangeText={onChange}
                value={value}
              />
            </Input>
          )}
          name="last_name"
        />
        {errors.last_name && (
          <Text style={styles.error}>{errors.last_name.message}</Text>
        )}

        {/* Mobile */}
        <Text style={styles.label}>Mobile</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input variant="primary" style={styles.input}>
              <InputField
                placeholder="Mobile Number"
                onChangeText={onChange}
                value={value}
              />
            </Input>
          )}
          name="mobile_number"
        />
        {errors.mobile_number && (
          <Text style={styles.error}>{errors.mobile_number.message}</Text>
        )}

        {/* University/Institution Name */}
        <Text style={styles.label}>University/Institution Name</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input variant="primary" style={styles.input}>
              <InputField
                placeholder="University/Institution Name"
                onChangeText={onChange}
                value={value}
              />
            </Input>
          )}
          name="university_institution_name"
        />
        {errors.university_institution_name && (
          <Text style={styles.error}>
            {errors.university_institution_name.message}
          </Text>
        )}

        {/* Undergraduate Admission Year */}
        <Text style={styles.label}>Undergraduate Admission Year</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Select
              style={styles.input}
              value={`${value}`}
              onValueChange={onChange}
            >
              <SelectTrigger variant="primary" size="md">
                <SelectInput placeholder="Undergraduate Admission Year" />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                    <Text
                      style={{ fontSize: 18, marginTop: 16, color: "#777" }}
                    >
                      Undergraduate Admission Year
                    </Text>
                  </SelectDragIndicatorWrapper>

                  {selectItemsRender()}
                </SelectContent>
              </SelectPortal>
            </Select>
          )}
          name="undergraduate_admission_year"
        />
        {errors.university_institution_name && (
          <Text style={styles.error}>
            {errors.university_institution_name.message}
          </Text>
        )}

        {/* Graduation Year */}
        <Text style={styles.label}>Graduation Year</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Select
              style={styles.input}
              value={`${value}`}
              onValueChange={onChange}
            >
              <SelectTrigger variant="primary" size="md">
                <SelectInput placeholder="Graduation Year" />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                    <Text
                      style={{ fontSize: 18, marginTop: 16, color: "#777" }}
                    >
                      Select Graduation Year
                    </Text>
                  </SelectDragIndicatorWrapper>

                  {selectItemsRender()}
                </SelectContent>
              </SelectPortal>
            </Select>
          )}
          name="graduation_year"
        />
        {errors.graduation_year && (
          <Text style={styles.error}>{errors.graduation_year.message}</Text>
        )}

        {/* Department */}
        <Text style={styles.label}>Department</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input variant="primary" style={styles.input}>
              <InputField
                placeholder="Department"
                onChangeText={onChange}
                value={value}
              />
            </Input>
          )}
          name="department"
        />
        {errors.department && (
          <Text style={styles.error}>{errors.department.message}</Text>
        )}

        {/* Height */}
        <Text style={styles.label}>Height</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input variant="primary" style={styles.input}>
              <InputField
                keyboardType="numeric"
                placeholder="Height"
                value={`${value}`}
                onChangeText={onChange}
              />
              <Text style={styles.unit}>ft</Text>
            </Input>
          )}
          name="height"
        />
        {errors.height && (
          <Text style={styles.error}>{errors.height.message}</Text>
        )}

        {/* Weight */}
        <Text style={styles.label}>Weight</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input variant="primary" style={styles.input}>
              <InputField
                keyboardType="numeric"
                placeholder="Weight"
                value={`${value}`}
                onChangeText={onChange}
              />
              <Text style={styles.unit}>kg</Text>
            </Input>
          )}
          name="weight"
        />
        {errors.weight && (
          <Text style={styles.error}>{errors.weight.message}</Text>
        )}

        <Button variant="secondary" onPress={handleSubmit(handleNext)}>
          <ButtonText>Next</ButtonText>
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  area: {
    backgroundColor: "white",
  },
  inner: {
    padding: 20,
    backgroundColor: "white",
  },
  input: {
    marginBottom: 15,
  },
  unit: {
    lineHeight: 46,
    marginRight: 15,
    color: "gray",
  },
  error: {
    color: "red",
    paddingLeft: 15,
    marginTop: -12,
    marginBottom: 8,
    fontSize: 11,
    lineHeight: 12,
  },
  label: {
    color: "#5CB35E",
    paddingLeft: 15,
    fontSize: 12,
  },
});
