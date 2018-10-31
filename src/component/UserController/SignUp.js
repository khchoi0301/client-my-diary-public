import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class SignUp extends Component {
  render() {
    return (
      <div>
        <Form action="http://10.130.151.17:3001/auth/join" method="post">
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="example@gmail.com"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleNicknmae">Nickname</Label>
            <Input
              type="text"
              name="nick"
              id="exampleNickname"
              placeholder="Nickname"
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
        <a href="/">main</a>
      </div>
    );
  }
}

export default SignUp;
