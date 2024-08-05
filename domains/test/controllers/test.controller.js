import * as testService from '../services/test.service.js';

async function testList(req, res) {
  try {
    const tests = await testService.findTestList();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
}

async function testAdd(req, res) {
  try {
    const createdTest = await testService.createTest(req.body);
    res.status(201).json(createdTest);
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
}

async function testModify(req, res) {
  try {
    const { testId } = req.params;
    const updatedTest = await testService.updateTest(testId, req.body);
    res.status(200).json(updatedTest);
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
}

async function testRemove(req, res) {
  try {
    const { testId } = req.params;
    await testService.deleteTest(testId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
}

// Redis ���� ��Ʈ�ѷ�
async function getCacheValue(req, res) {
  try {
    const { key } = req.params;
    const value = await testService.getFromCache(key);
    res.status(200).json({ key, value });
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
}

async function setCacheValue(req, res) {
  try {
    const { key, value } = req.body;
    await testService.setToCache(key, value);
    res.status(201).json({ message: 'Value set successfully' });
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
}

export {
  testList,
  testAdd,
  testModify,
  testRemove,
  getCacheValue,
  setCacheValue,
};
