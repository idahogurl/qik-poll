import AWN from 'awesome-notifications';

export default function onError(message, err) {
  const options = {
    position: 'top-right',
  };

  const notifier = new AWN(options);
  notifier.alert(message);
  console.error(err);
}
