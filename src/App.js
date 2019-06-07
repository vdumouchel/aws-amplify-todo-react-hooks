import React, { useState, useEffect } from 'react';
import { Form, Card, Input, Button, Row, Col, Divider } from 'antd';
import { withAuthenticator } from 'aws-amplify-react'
import styles from './styles'


function CreateNote({ addNote }) {

  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;

    addNote(value);
    setValue(value);
  }

  return (
    <Form onSubmit={handleSubmit} style={styles.Input}>
      <Row>
        <Col span={18}>
          <Input
            type="text"
            className="input"
            value={value}
            style={styles.Input}
            placeholder="Add a new todo tech to the stack"
            onChange={e => setValue(e.target.value)}
          />
        </Col>
        <Col span={6}>
          <Button type="primary" htmlType="submit" style={styles.Submit}>Submit</Button>
        </Col>
      </Row>
    </Form>
  );
}




function App() {

  // set App backgroundColor
  useEffect(
    () => {
      document.body.style.background = '#f1f3f5'
    }, []
  )

  let [notes, setNotes] = useState([{ note: 'AWS-Amplify' }, { note: 'AWS-Cognito' }, { note: 'React' }, { note: 'React-Hooks' }, { note: 'GraphQL' }, { note: 'Ant Design Framework' }, { note: 'Styles.js Component Styling' }])

  const addNote = note => {
    const newNote = [...notes, { note }];
    setNotes(newNote);
  };

  const removeNote = index => {
    const newNote = [...notes];
    newNote.splice(index, 1);
    setNotes(newNote);
  };

  return (
    <div style={styles.MainContainer} >
      <Row>
        <h1 style={styles.Title}> Todo Tech Stack</h1>
      </Row>
      {/* Add notes  */}
      <Card style={styles.Card}>
        <CreateNote addNote={addNote} />
      </Card>
      <Card style={styles.Card}>
        {/* Notes list  */}
        <div>
          {notes.map((note, index) => (
            <div>
              <div key={index} style={(index === notes.length - 1) ? styles.noBorderTech : styles.Tech}>
                <li className="list pa1 f4" index={index} key={index}>
                  {note.note}
                </li>
                <Button icon="close" type="link" style={styles.Delete} onClick={() => removeNote(index)}>
                </Button>
              </div>
              {/* <div>
                <Divider />
              </div> */}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default withAuthenticator(App, true);


