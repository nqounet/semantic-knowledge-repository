const fs = require('fs');
const os = require('os');
const path = require('path');
const { saveKnowledge } = require('./save_knowledge.cjs');

describe('saveKnowledge', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn(); // 出力のノイズを抑えるためにモック化
    
    // spyOnを使用して確実に関数をモック化
    jest.spyOn(os, 'homedir').mockReturnValue('/mocked/home');
    jest.spyOn(fs, 'existsSync').mockReset();
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {});
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('ディレクトリが存在しない場合は作成してファイルを保存する', () => {
    fs.existsSync.mockReturnValue(false); // ディレクトリが存在しないとする

    const content = { summary: "Test summary", facts: [] };
    const finalPath = saveKnowledge('test-file', content);

    expect(fs.mkdirSync).toHaveBeenCalledWith(path.join('/mocked/home', '.agents', 'knowledges'), { recursive: true });
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join('/mocked/home', '.agents', 'knowledges', 'test-file.json'),
      JSON.stringify(content, null, 2)
    );
    expect(finalPath).toBe(path.join('/mocked/home', '.agents', 'knowledges', 'test-file.json'));
  });

  it('ファイルが既に存在する場合は連番を付けて保存する', () => {
    fs.existsSync
      .mockReturnValueOnce(true)  // 1回目 (ディレクトリの存在確認): true
      .mockReturnValueOnce(true)  // 2回目 (ファイルの存在確認 test-file.json): true
      .mockReturnValueOnce(false); // 3回目 (ファイルの存在確認 test-file-1.json): false

    const content = { summary: "Another test" };
    const finalPath = saveKnowledge('test-file', JSON.stringify(content));

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join('/mocked/home', '.agents', 'knowledges', 'test-file-1.json'),
      JSON.stringify(content, null, 2)
    );
    expect(finalPath).toBe(path.join('/mocked/home', '.agents', 'knowledges', 'test-file-1.json'));
  });
});
