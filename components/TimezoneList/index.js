import {Button, Icon, List, ListItem} from "@ui-kitten/components";
import { StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ({timezones=[]}) {
  const removeTimezone = async () => {
    try {
      const data = await AsyncStorage.removeItem('@testKey');
    } catch (e) {
      console.log(e);
    }
  }

  const renderItemAccessory = (props) => (
    <Button size='tiny' onPress={removeTimezone}>Remove</Button>
  );

  const renderItemIcon = (props) => (
    <Icon {...props} name='clock'/>
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

  return (
    <>
      <List
        style={styles.container}
        data={timezones}
        renderItem={renderItem}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 192,
  },
});
