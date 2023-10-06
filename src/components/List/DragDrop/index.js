import React, { useEffect, useState } from 'react';
import { List, Skeleton } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './index.module.scss';
import xIcon from 'assets/icons/X.png'; 
import Icon from 'components/Icon';
import classnames from 'classnames';
import frontBackIcon from '../../../assets/icons/front-back.png'
import PropTypes from 'prop-types';

function DragDropList({ source, removeCallBack }) {

  const [listResult, setListResult] = useState([]);

  // Set list result
  useEffect(() => {
    setListResult(source);
  }, [source]);

  // Trigger when drag end
  const onDragEnd = (dragEvent) => {
    const fromIndex = dragEvent?.source?.index;
    const toIndex = dragEvent?.destination?.index;

    if (toIndex < 0) return; // Ignores if outside designated area

    const items = [...listResult];
    const item = items.splice(fromIndex, 1)[0];
    items.splice(toIndex, 0, item);
    setListResult(items);

    return;
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <List
                className={classnames(styles?.list, 'characters')}
                itemLayout="horizontal"
                dataSource={listResult}
                renderItem={(item, index) => (
                  <Draggable
                    key={item?.id}
                    draggableId={item?.id}
                    index={index}
                  >
                    {(providedItem) => (
                      <div
                        ref={providedItem.innerRef}
                        {...providedItem.draggableProps}
                        {...providedItem.dragHandleProps}
                      >
                        <List.Item className={styles?.listItem} actions={[]}>
                          <Skeleton
                            title={false}
                            loading={item?.loading}
                            active
                          >
                            <List.Item.Meta
                              title={
                                <a href="https://ant.design">{item?.title}</a>
                              }
                              description={item?.description}
                            />
                            <div
                              key="delete"
                              className={styles?.xIconWrapper}
                              onClick={() => removeCallBack(index)}
                            >
                              <Icon src={xIcon} width="7" height="7" />
                            </div>
                            <div
                              key="changePlace"
                              className={styles?.xIconWrapperFront}
                              onClick={() => {}}
                            >
                              <Icon src={frontBackIcon} width="7" height="7" />
                            </div>
                          </Skeleton>
                        </List.Item>
                      </div>
                    )}
                  </Draggable>
                )}
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

DragDropList.propTypes = {
  source: PropTypes.array,
  removeCallBack: PropTypes.func,
};

DragDropList.defaultProps = {
  source: [
    {
      id: "1",
      title: 'Title 1',
      description: 'Ant Design Title 1',
    },
    {
      id: "2",
      title: 'Title 2',
      description: 'Ant Design Title 2',
    },
    {
      id: "3",
      title: 'Title 3',
      description: 'Ant Design Title 3',
    },
  ],
  removeCallBack: (index)=> {console.log(index)}
};

export default DragDropList;
