// Menu: Safari Reading List export
// Description:  Export items from Safari Reading List (to clipboard)

import process from 'process';
import parser from 'fast-xml-parser';

async function handleError(error, code = 1) {
  setPlaceholder('Something went wrong...');
  await wait(2000);
  process.exit(code);
}

function findByKey(array, key) {
  return array.find((item) => {
    if (Array.isArray(item.key)) {
      return item.key.includes(key);
    } else {
      return item.key === key;
    }
  });
}

function getDateAdded(item) {
  const date = item.date;
  if (Array.isArray(date)) {
    return date[0];
  }
  return date;
}

function getReadingList(bookmarks) {
  let readingList = bookmarks.plist.dict.array.dict.find(
    (item) => item.dict?.string === 'Reading List'
  );
  readingList = readingList.array.dict.map((item, i) => {
    return {
      dateAdded: getDateAdded(findByKey(item.dict, 'DateAdded')),
      previewText: findByKey(item.dict, 'PreviewText')?.string,
      title: findByKey(item.dict, 'title')?.string,
      link: item.string?.[0],
      image: item.string?.[3],
    };
  });
  return readingList;
}

function formatReadingList(readingList, format) {
  let text = '';
  for (const item of readingList) {
    switch (format) {
      case 'markdown':
        text += `[${item.title}](${item.link})`;
      case 'raw':
        text += item.link;
    }
    text += '\n';
  }
  return text;
}

try {
  const format = await arg('Choose formatting option', [
    {
      name: 'Raw links',
      value: 'raw',
    },
    {
      name: 'Markdown links',
      value: 'markdown',
    },
  ]);

  const { code, stdout, stderr } = exec(
    'plutil -convert xml1 -o - ~/Library/Safari/Bookmarks.plist'
  );

  if (code !== 0) {
    await handleError(stderr, code);
  }

  const xml = stdout;
  const bookmarks = parser.parse(xml);
  const readingList = getReadingList(bookmarks);
  const text = formatReadingList(readingList, format);
  copy(text);
  setPlaceholder('Reading list ready in clipboard');
  await wait(2000);
} catch (error) {
  await handleError(error);
}
