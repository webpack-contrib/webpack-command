const {
  addSerializer,
  SnapshotState,
  toMatchSnapshot,
} = require('jest-snapshot');
const serializer = require('jest-serializer-path');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

let current = null;
const cache = {};

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

  let result = title.reverse().join(' > ');
  let index = 0;

  // can't yet figure out how jest-snapshot figures out how many snapshots are
  // in a single test/it() group, so we'll mimic it for the time being.
  if (typeof cache[result] !== 'undefined') {
    cache[result] += 1;
    index = cache[result];
  } else {
    cache[result] = 0;
  }

  result = `${result} #${index}`;

  return result;
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

  // console.log(snapshotState);

  const result = matcher(received);

  snapshotState.save();

  return result;
}

addSerializer(serializer);

expect.extend({ toMatchSnapshot: match });
