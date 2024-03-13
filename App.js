import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Tabela from './components/Tabela';
import Dia from './components/Dia';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>
        <Dia /> 
        <Tabela />
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
