const nGroupMembersEqualSplit = (groupMembers: [], ammountPaid: number) => {
  const ammountOwedByEach = ammountPaid / groupMembers.length;
  return ammountOwedByEach;
}

const splitByTwo = (ammountPaid: number) => {
  return ammountPaid / 2
}

module.exports = {
  nGroupMembersEqualSplit,
  splitByTwo
};