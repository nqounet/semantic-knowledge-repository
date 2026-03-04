const fs = require('fs');
const os = require('os');
const { searchKnowledge } = require('./search_knowledge.cjs');

describe('searchKnowledge', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn(); // 出力のノイズを抑えるためにモック化

    // spyOnを使用して確実に関数をモック化
    jest.spyOn(os, 'homedir').mockReturnValue('/mocked/home');
    jest.spyOn(fs, 'existsSync').mockReset();
    jest.spyOn(fs, 'readdirSync').mockReset();
    jest.spyOn(fs, 'readFileSync').mockReset();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('ディレクトリが存在しない場合は空の配列を返す', () => {
    fs.existsSync.mockReturnValue(false);
    const results = searchKnowledge('query');
    
    expect(results).toEqual([]);
    expect(console.log).toHaveBeenCalledWith('No knowledge repository found.');
  });

  it('JSONファイルの中身を検索し、マッチする結果を返す', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readdirSync.mockReturnValue(['file1.json', 'file2.txt', 'file3.json']);
    
    const mockFile1 = JSON.stringify({ summary: "Testing jest", keywords: ["jest", "mock"], confidence_score: 90 });
    const mockFile3 = JSON.stringify({ summary: "Unrelated content", facts: ["nothing here"], confidence_score: 50 });

    fs.readFileSync.mockImplementation((filePath) => {
      if (filePath.endsWith('file1.json')) return mockFile1;
      if (filePath.endsWith('file3.json')) return mockFile3;
      return '{}';
    });

    const results = searchKnowledge('jest');

    expect(results).toHaveLength(1);
    expect(results[0]).toEqual({
      file: 'file1.json',
      summary: 'Testing jest',
      confidence: 90
    });
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Found 1 result(s):'));
  });
});
