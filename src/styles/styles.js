import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  brainrotName: {
    backgroundColor: "#00dd11",
    fontSize:16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  brainrotCard: {
    backgroundColor: "#00ff44",
    borderRadius: 10,
    padding: 15,
    margin: 8,
    width: "45%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  addCard: {
    backgroundColor: "#00aa44",
    borderRadius: 10,
    padding: 15,
    margin: 8,
    width: "45%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  brainrotListContainer: {
    paddingHorizontal: 10
  },
});

export default styles;