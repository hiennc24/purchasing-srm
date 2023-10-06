import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import EditorType from 'ckeditor5-custom-build/build_ckeditor/ckeditor';
import './ckEditor.css';
// import { getListUsers } from 'services/comment';
import MyCustomUploadAdapterPlugin from './MyCustomUploadAdapterPlugin';
// import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
// import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials';

export default function EditorBase({
  type = 'classic',
  placeholder = '',
  onTextChange,
  initContent,
  items = [],
}) {
  const [showTool, setShowTool] = useState(false);
  const [data, setdata] = useState('');
  const [isEditorReady, setIsEditorReady] = useState(false);
  // const [items, setItems] = useState([]);
  const itemsClassic = [
    'heading',
    '|',
    'bold',
    'italic',
    'underline',
    // '|',
    // 'MathType',
    // 'ChemType',
    '|',
    // 'specialCharacters',
    'link',
    'insertImage',
    'mediaEmbed',
    '|',
    'undo',
    'redo',
  ];
  const itemsInline = [
    'bold',
    'italic',
    'underline',
    '|',
    'MathType',
    'ChemType',
  ];

  useEffect(() => {
    if (initContent && isEditorReady) {
      setdata(initContent);
    }
  }, [initContent, isEditorReady]);

  // useEffect(async () => {
  //   const users = await getListUsers();
  //   const d = users?.data?.data || [];
  //   const output = d.map(user => {
  //     const { _id, name, username } = user;
  //     return {
  //       id: _id, name, userId: _id
  //     }
  //   })
  //   setItems(output);
  // }, [])

  // console.log(`items`, items);

  const handleMaximize = (evt) => {
    const className = document.getElementsByClassName(
      'wrs_modal_maximize_button',
    );
    for (let ele of className) ele && ele.click();
  };

  function SpecialCharactersEmoji(editor) {
    editor.plugins.get('insertImage').addItems('Emoji', [
      { title: 'smiley face', character: '😊' },
      { title: 'rocket', character: '🚀' },
      { title: 'wind blowing face', character: '🌬️' },
      { title: 'floppy disk', character: '💾' },
      { title: 'heart', character: '❤️' },
    ]);
  }

  // const items = [
  //   { id: '@swarley', userId: '1', name: 'Barney Stinson', link: 'https://www.imdb.com/title/tt0460649/characters/nm0000439' },
  //   { id: '@lilypad', userId: '2', name: 'Lily Aldrin', link: 'https://www.imdb.com/title/tt0460649/characters/nm0004989' },
  //   { id: '@marshmallow', userId: '3', name: 'Marshall Eriksen', link: 'https://www.imdb.com/title/tt0460649/characters/nm0781981' },
  //   { id: '@rsparkles', userId: '4', name: 'Robin Scherbatsky', link: 'https://www.imdb.com/title/tt0460649/characters/nm1130627' },
  //   { id: '@tdog', userId: '5', name: 'Ted Mosby', link: 'https://www.imdb.com/title/tt0460649/characters/nm1102140' }
  // ];

  function getFeedItems(queryText) {
    // As an example of an asynchronous action, return a promise
    // that resolves after a 100ms timeout.
    // This can be a server request or any sort of delayed action.
    return new Promise((resolve) => {
      setTimeout(() => {
        const itemsToDisplay = items
          // Filter out the full list of all items to only those matching the query text.
          .filter(isItemMatching)
          // Return 10 items max - needed for generic queries when the list may contain hundreds of elements.
          .slice(0, 10);

        resolve(itemsToDisplay);
      }, 100);
    });

    // Filtering function - it uses the `name` and `username` properties of an item to find a match.
    function isItemMatching(item) {
      // Make the search case-insensitive.
      const searchString = queryText.toLowerCase();

      // Include an item in the search results if the name or username includes the current user input.
      return (
        item.name.toLowerCase().includes(searchString) ||
        item.id.toLowerCase().includes(searchString)
      );
    }
  }

  function customItemRenderer(item) {
    const itemElement = document.createElement('span');

    itemElement.classList.add('custom-item');
    itemElement.id = `mention-list-item-id-${item.userId}`;
    itemElement.textContent = `${item.name} `;

    const usernameElement = document.createElement('span');

    usernameElement.classList.add('custom-item-username');
    usernameElement.textContent = item.id;

    itemElement.appendChild(usernameElement);

    return itemElement;
  }

  return (
    <div
      className={
        (type == 'inline' && !showTool ? 'hidden-toolbar' : '') +
        ` ${type}` +
        ' compose-editor'
      }
    >
      <CKEditor
        editor={EditorType}
        config={{
          placeholder: placeholder,
          // extraPlugins: [],
          extraPlugins: [
            // SpecialCharacters, SpecialCharactersEssentials,
            // SpecialCharactersEmoji,
            MyCustomUploadAdapterPlugin,
          ],
          toolbar: {
            items: type !== 'inline' ? itemsClassic : itemsInline,
          },
          mention: {
            feeds: [
              {
                marker: '@',
                feed: getFeedItems,
                itemRenderer: customItemRenderer,
              },
            ],
          },
        }}
        // onReady={editor => setIsEditorReady(true)}
        onChange={(event, editor) => {
          const data = editor.getData();
          onTextChange && onTextChange(data);
        }}
        data={data}
        onBlur={(event, editor) => {
          type == 'inline' && setShowTool(false);
        }}
        onFocus={(event, editor) => {
          type == 'inline' && setShowTool(true);
        }}
        onReady={(editor) => {
          setIsEditorReady(true);
          if (editor) {
            // const users = await getListUsers();
            // const d = users?.data?.data || [];
            // const output = d.map(user => {
            //   const { _id, name, username } = user;
            //   return {
            //     id: _id, name, userId: _id
            //   }
            // })
            // setItems(output);
            // const commandMath = editor.commands.get('MathType');
            // const commandChem = editor.commands.get('ChemType');
            // commandMath.on('execute', () => {
            //   handleMaximize(editor);
            // });
            // commandChem.on('execute', () => {
            //   handleMaximize(editor);
            // });
          }
        }}
      />
    </div>
  );
}
