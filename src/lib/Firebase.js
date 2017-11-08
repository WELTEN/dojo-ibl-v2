import * as firebase from 'firebase';

export const flattenFirebaseList = (list = {}) =>
  Object.keys(list).map((key) => ({ key, ...list[key] }));

export const deleteProject = (projectKey) => {
  const currentUser = firebase.auth().currentUser;
  firebase.database().ref(`users/${currentUser.uid}/projects/${projectKey}`).remove();
  firebase.database().ref(`projects/${projectKey}/phases`).once('value', (snapshot) => {
    const phases = Object.keys(snapshot.val() || {});
    phases.forEach((key) => {
      firebase.database().ref(`phases/${key}/activities`).once('value', (snapshot) => {
        const activities = Object.keys(snapshot.val() || {});
        activities.forEach((key) => {
          firebase.database().ref(`activities/${key}`).remove();
        });
      }).then(() => {
        firebase.database().ref(`phases/${key}`).remove();
      });
    });
  }).then(() => {
    firebase.database().ref(`projects/${projectKey}`).remove();
  });
};

export const deleteGroup = (group) => {
  firebase.database().ref(`groups/${group.key}/users`).once('value').then((snapshot) => {
    const users = Object.keys(snapshot.val() || {});
    users.forEach((user) => {
      firebase.database().ref(`users/${user}/groups/${group.key}`).remove();
    });
  }).then(() => {
    firebase.database().ref(`projects/${group.project}/groups/${group.key}`).remove();
    firebase.database().ref(`groupCodes/${group.code}`).remove();
    firebase.database().ref(`groups/${group.key}`).remove();
  });
};
