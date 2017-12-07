import * as firebase from 'firebase';
import randomstring from 'randomstring';

export const flattenFirebaseList = (list = {}) =>
  Object.keys(list).map((key) => ({ key, ...list[key] }));

export const getKeys = (obj = {}) => Object.keys(obj);

export const deleteProject = (projectKey) => {
  const currentUser = firebase.auth().currentUser;
  firebase.database().ref(`users/${currentUser.uid}/projects/${projectKey}`).remove();
  firebase.database().ref(`projects/${projectKey}/phases`).once('value', (snapshot) => {
    const phases = Object.keys(snapshot.val() || {});
    phases.forEach((key) => {
      firebase.database().ref(`phases/${key}/activities`).once('value', (snapshot) => {
        const activities = Object.keys(snapshot.val() || {});
        activities.forEach((key) => {
          const ref = firebase.database().ref(`activities/${key}`);
          ref.once('value').then((snapshot) => {
            const activity = snapshot.val();
            if (activity && activity.childActivitiesKey) {
              firebase.database().ref(`childActivities/${activity.childActivitiesKey}`).remove();
            }
            ref.remove();
          });
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

export const deleteProjectAndGroups = (projectKey) => {
  firebase.database().ref(`projects/${projectKey}/groups`).once('value').then((snapshot) => {
    const groups = Object.keys(snapshot.val() || {});
    return Promise.all(groups.map((groupKey) =>
      firebase.database().ref(`groups/${groupKey}`).once('value')
    ));
  }).then((groups) => {
    groups.forEach((snapshot) => {
      const group = snapshot.val();
      if (!group) return;
      group.key = snapshot.key;
      deleteGroup(group);
    });
  }).then(() => {
    deleteProject(projectKey);
  });
};

export const createGroup = (name, projectKey) => {
  const code = generateGroupCode();
  const key = firebase.database().ref('groups').push().getKey();
  return [key, Promise.all([
    firebase.database().ref(`projects/${projectKey}/groups/${key}`).set(true),
    firebase.database().ref(`groups/${key}`).set({
      name,
      code,
      project: projectKey,
      creationDate: Date.now()
    }),
    firebase.database().ref(`groupCodes/${code}`).set(key)
  ])];
};

export const generateGroupCode = () =>
  randomstring.generate({ length: 6, capitalization: 'uppercase' });

export const addCurrentUserToGroup = (key, projectKey) => {
  const currentUser = firebase.auth().currentUser;
  firebase.database().ref(`projects/${projectKey}/users/${currentUser.uid}`).set(true);
  firebase.database().ref(`users/${currentUser.uid}/groups/${key}`).set(true);
  firebase.database().ref(`groups/${key}/users/${currentUser.uid}`).set(currentUser.photoURL || false);
};

export const createInputInActivity = (activityKey) => {
  const key = firebase.database().ref('inputs').push().getKey();
  firebase.database().ref(`inputs/${key}`).set('');
  firebase.database().ref(`activities/${activityKey}/input`).set(key);
};

export const removeInputFromActivity = (activityKey, inputKey) => {
  firebase.database().ref(`activities/${activityKey}/input`).remove();
  firebase.database().ref(`inputs/${inputKey}`).remove();
};

export const createChecklistInActivity = (activityKey) => {
  const key = firebase.database().ref('checklists').push().getKey();
  firebase.database().ref(`checklists/${key}`).set({ items: {} });
  firebase.database().ref(`activities/${activityKey}/checklist`).set(key);
};

export const removeChecklistFromActivity = (activityKey, checklistKey) => {
  firebase.database().ref(`activities/${activityKey}/checklist`).remove();
  firebase.database().ref(`checklists/${checklistKey}`).remove();
};
