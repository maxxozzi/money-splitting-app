import React, { useState } from 'react';
import './Interface.css';
import backgroundPict from './img/pasar.jpg';
import { InputGroup, InputGroupAddon, Input, InputGroupText, Button, FormText, FormFeedback, Modal, ModalHeader, ModalBody } from 'reactstrap';

function App() {
  const [money, setMoney] = useState('');
  const [invalidity, setInvalidity] = useState(false);
  const [invalidSeparator, setSeparator] = useState(false);
  const [wrongPosition, setPosition] = useState(false);
  const [missValue, setMissing] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [modal, setModal] = useState(false);
  const [valueMoney, setValue] = useState(0);

  function convertNumber(a) {
    return parseInt(a.replace(/,.*|[^0-9]/g, ''), 10);
  }

  function buttonEnter() {
    if (money === '') {
      setInvalidity(true);
      setEmpty(true);
    } else if ((/[0-9]/gm).test(money) === false) {
      setInvalidity(true);
      setMissing(true);
    } else if ((/[a-zA-Z]$/gm).test(money) === true) {
      setInvalidity(true);
      setPosition(true);
    } else if ((/^[0-9]+\,[0-9][0-9]|[0-9]\s[0-9]/gm).test(money) === true) {
      setInvalidity(true);
      setSeparator(true);
    } else {
      var valueConvert = convertNumber(money);
      setValue(valueConvert);
      processInputNumber();
    }
  }

  function processInputNumber() {
    setModal(!modal);
  }

  function processInput(e) {
    setMoney(e);
    setInvalidity(false);
    setEmpty(false);
    setMissing(false);
    setPosition(false);
    setSeparator(false);
  }

  return (
    <div className="App-wrap">
      <div className="App-background" style={{backgroundImage: 'url('+ backgroundPict +')'}}>
        <div className="App-form">
          <div className="row">
            <div style={{margin: 10, backgroundColor: '#fff', padding: 20, borderRadius: 15}}>
              <h1 style={{fontSize: 'bold', color: '#00b894', textAlign: 'center'}}>Split It</h1>
              <div style={{marginTop: 15}}>
                <InputGroup size="lg">
                  <InputGroupAddon addonType="prepend" style={{backgroundColor: '#fff'}}>
                    <InputGroupText style={{backgroundColor: '#00b894'}}>
                      <i className="fas fa-money-bill" style={{color: '#fff'}}></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input onChange={(e) => processInput(e.target.value)} invalid={invalidity} />
                  <FormFeedback tooltip>
                    { empty ? "Blank input" : null }
                    { invalidSeparator ? "Invalid separator" : null }
                    { wrongPosition ? "Valid character in wrong position" : null }
                    { missValue ? "Missing value" : null }
                  </FormFeedback>
                </InputGroup>
                <FormText>Fill with amount of money you want to split</FormText>
              </div>
              <div style={{marginTop: 30}}>
                <Button size="lg" onClick={() => buttonEnter()} style={{backgroundColor: '#00b894', color: '#fff', fontWeight: 'bold'}} block>ENTER</Button>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={modal} toggle={() => setModal(!modal)}>
          <ModalHeader toggle={() => setModal(!modal)}>Rp. {valueMoney}</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

export default App;
