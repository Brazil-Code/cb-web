import React from "react";
import userService from "../services/login";
import api from '../services/administration/userService';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: userService.getFirstName(),
      lastName: userService.getLastName(),
      email: userService.getEmail(),
      edit: false,
      loading: false
    };

    this.enableUpdate = this.enableUpdate.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  /**
   * Disable loading and updates session storage's information
   */
  handleSuccess() {
    this.setState({ loading: false });
    this.setState({ edit: false });

    let user = JSON.parse(sessionStorage.getItem("user"));
    user.firstName = this.state.firstName;
    user.lastName = this.state.lastName;
    user.email = this.state.email;

    sessionStorage.setItem("user", JSON.stringify(user));
  }

  /**
   * Disable loading
   */
  handleError() {
    this.setState({ loading: false });
    this.setState({ edit: false });
  }

  /**
   * Call REST API to update user's information
   */
  updateProfile() {
    this.setState({ loading: true })
    api.put('users/' + userService.getId(), {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    },
      {
        headers: {
          Authorization: userService.getToken(),
        }
      })
      .then(success => {
        this.handleSuccess();
        alert(success.status);
      })
      .catch(_error => {
        if (_error.status == 400) {
          this.handleError();
          alert(_error.value);
        } else {
          this.handleError();
          alert('erro inesperado');
        }
      })
  }

  /**
   * Enables Update button
   */
  enableUpdate() {
    this.setState({ edit: true });
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Meu Perfil</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Empresa</label>
                          <Input
                            defaultValue="Brazil Code"
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                      <FormGroup>
                          <label>Nome</label>
                          <Input
                            defaultValue={this.state.firstName}
                            type="text"
                            disabled={this.state.edit == false}
                            onChange={e => this.setState({firstName: e.target.value})}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                      <FormGroup>
                          <label>Último nome</label>
                          <Input
                            defaultValue={this.state.lastName}
                            type="text"
                            disabled={this.state.edit == false}
                            onChange={e => this.setState({lastName: e.target.value})}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                      <FormGroup>
                          <label>Usuário</label>
                          <Input
                            defaultValue={userService.getUserName()}
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="8">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            E-mail
                          </label>
                          <Input
                            type="email"
                            value={this.state.email}
                            onChange={e => this.setState({email: e.target.value})}
                            disabled={this.state.edit == false}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  {
                    this.state.edit
                    ?
                    <Button className="btn-fill" color="primary" type="submit" onClick={this.updateProfile}>
                      { this.state.loading ? 'Atualizando...' : 'Atualizar' }
                    </Button>
                    :
                    <Button className="btn-fill" color="primary" type="submit" onClick={this.enableUpdate}>
                      Editar
                    </Button>
                  }
                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#" onClick={e => e.preventDefault()}>
                      <img
                        alt="user profile picture"
                        className="avatar"
                        src={sessionStorage.getItem(`imageProfile`)}
                      />
                      <h5 className="title">
                        {userService.getFullName()}
                      </h5>
                    </a>
                    <p className="description">{userService.getArea()}</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default UserProfile;
