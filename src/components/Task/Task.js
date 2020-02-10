import React, { useState } from 'react';
import classes from './Task.module.scss'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button';
import { connect } from 'react-redux';
import { toggleEditor, saveChanges } from '../../store/actions/topicList';

const Task = ({ task: { topic, task, photoUrls }, toggleEditor, topicId, index, save }) => {

  const [topicValue, setTopicValue] = useState(topic)
  const [taskValue, setTaskValue] = useState(task)
  const [urls, setUrls] = useState(photoUrls)
  const [isEdit, setIsEdit] = useState(false)
  const [urlValue, setUrlValue] = useState('')

  const onButtonHandler = () => {
    const newTask = {
      topic: topicValue,
      task: taskValue,
      photoUrls: urls
    }
    save(topicId, index, newTask)
    setIsEdit(!isEdit)
  }

  const deleteImage = (buttonId) => {
    const newUrls = urls.filter((item, i) => i !== +buttonId)
    setUrls(newUrls);
  }

  const photoUrlsHandler = (e) => {
    setUrls(urls.concat(e.target.value));
    setUrlValue('');
  }

  return (
    <div >
      {isEdit
        ? <Input value={topicValue} label={topicValue} onChange={e => setTopicValue(e.target.value)} />
        : <h3>{topicValue}</h3>}
      {isEdit
        ? <Input value={taskValue} label={taskValue} onChange={e => setTaskValue(e.target.value)} />
        : <p>{taskValue}</p>}

      <div className={classes.imageWrapper}>
        {urls.map((url, i) => (
          <Auxiliary key={topic + i}>
            <img src={url} id={topic + i} alt={url} />
            {isEdit 
            && <button 
                ident={i} 
                className={classes.editButton} 
                onClick={(e) => deleteImage(e.target.attributes.ident.value)} />}
          </Auxiliary>
        ))}
      </div>
      {isEdit
        ? <Auxiliary>
          <Input 
            label="Paste photo's URL"
            value={urlValue}
            onChange={e => setUrlValue(e.target.value)}
            onKeyPress={photoUrlsHandler}
             />
          <Button type='success' onClick={() => onButtonHandler()}>Save</Button>
        </Auxiliary>
        : <Button type='primary' onClick={() => setIsEdit(!isEdit)}>Edit</Button>
      }
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    toggleEditor: () => dispatch(toggleEditor()),
    save: (topicId, index, newTask) => dispatch(saveChanges(topicId, index, newTask))
  }
}

export default connect(null, mapDispatchToProps)(Task);