import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    width: 160,
    margin: 8,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  btn: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});
