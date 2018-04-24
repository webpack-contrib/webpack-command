const {
  addSerializer,
  SnapshotState,
  toMatchSnapshot,
} = require('jest-snapshot');
const serializer = require('jest-serializer-path');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

let current = null;

global.beforeEach(function beforeEach() {
  current = this.currentTest;
});

function nameTest(test) {
  let next = test;
  const title = [];

  for (;;) {
    if (!next.parent) {
      break;
    }

    title.push(next.title);
    next = next.parent;
  }

  return title.reverse().join(' > ');
}

function match(received) {
  const { file } = current;

  const snapshotState = new SnapshotState(file, {
    updateSnapshot: argv.update ? 'all' : 'new',
  });

  const matcher = toMatchSnapshot.bind({
    snapshotState,
    currentTestName: nameTest(current),
  });

  const result = matcher(received);

  snapshotState.save();

  return result;
}

addSerializer(serializer);

expect.extend({ toMatchSnapshot: match });
