import React from "react";
import userService from "../services/login";

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
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Editar Perfil</h5>
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
                            defaultValue={userService.getFirstName()}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                      <FormGroup>
                          <label>Último nome</label>
                          <Input
                            defaultValue={userService.getLastName()}
                            type="text"
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
                            value={userService.getEmail()}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Salvar
                  </Button>
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
