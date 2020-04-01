import React from "react";
import userService from "../services/login";
import NotificationAlert from "react-notification-alert";
import api from "../api/purch";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Row,
  Col,
  Form
} from "reactstrap";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createUser: userService.getId(),
      purchaseItem: "",
      priceQuotations: [
        {
          key: "1",
          link: "",
          unitValue: "",
          observation: "",
          amount: "",
          totalValue: "",
          file: ""
        },
        {
          key: "2",
          link: "",
          unitValue: "",
          observation: "",
          amount: "",
          totalValue: "",
          file: ""
        },
        {
          key: "3",
          link: "",
          unitValue: "",
          observation: "",
          amount: "",
          totalValue: "",
          file: ""
        }
      ],

      loading: false
    };

    this.sendQuotation = this.sendQuotation.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
  }

  async sendQuotation(e) {
    this.setState({ loading: true });
    e.preventDefault();
    this.handleAmount();
    api.post("purchase-request", this.state, {
        headers: {
          Authorization: userService.getToken()
        }
      })
      .then(_sucess => {
        this.notify("tr", "success", "Pedido enviado com sucesso");
        this.setState({ loading: false });
      })
      .catch(_error => {
        this.notify(
          "tr",
          "danger",
          "Erro ao cadastrar pedido de compra, favor contatar o Administrador do sistema"
        );
        this.setState({ loading: false });
      });
  }

  handleAmount() {
    this.state.priceQuotations.map(qt => {
      qt.totalValue = qt.unitValue * qt.amount;
    });
  }

  notify(place, type, mgs) {
    var type = type;
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>{mgs}</div>
        </div>
      ),
      type: type,
      icon: "tim-icons icon-alert-circle-exc",
      autoDismiss: 5
    };
    this.refs.notificationAlert.notificationAlert(options);
  }

  render() {
    return (
      <>
        <div className="react-notification-alert-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <div className="content">
          <Form onSubmit={this.sendQuotation}>
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <h5 className="title">Pedido de Compra</h5>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Área</label>
                          <Input
                            defaultValue={userService.getArea()}
                            disabled
                            type="text"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="6">
                        <FormGroup>
                          <label>Usuário</label>
                          <Input
                            defaultValue={userService.getUserName()}
                            type="text"
                            disabled
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <label>Descrição do produto</label>
                          <Input
                            type="text"
                            defaultValue={this.state.purchaseItem}
                            onChange={e => {
                              this.setState({ purchaseItem: e.target.value });
                            }}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            {/* quotation1 */}
            {this.state.priceQuotations.map(qt => {
              return (
                <Row key={qt.key} onClick={this.handleAmount()}>
                  <Col md="12">
                    <Card>
                      <CardHeader>
                        <h5 className="title">{qt.key}° Cotação</h5>
                      </CardHeader>

                      <CardBody>
                        <Row>
                          <Col className="pr-md-1" md="3">
                            <FormGroup>
                              <label>Link URL</label>
                              <Input
                                placeholder="http://expemplo.com/produto"
                                type="text"
                                defaultValue={qt.link}
                                onChange={e => (qt.link = e.target.value)}
                                required
                              />
                            </FormGroup>
                          </Col>

                          <Col className="px-md-1" md="4">
                            <FormGroup>
                              <label>Valor Unitário</label>
                              <Input
                                placeholder="R$"
                                name="price"
                                type="number"
                                defaultValue={qt.unitValue}
                                onChange={e => (qt.unitValue = e.target.value)}
                                required
                              />
                            </FormGroup>
                          </Col>

                          <Col className="px-md-1" md="5">
                            <FormGroup>
                              <label>Quantidade</label>
                              <Input
                                type="text"
                                type="number"
                                defaultValue={qt.amount}
                                onChange={e => (qt.amount = e.target.value)}
                                required
                              />
                            </FormGroup>
                          </Col>

                          <Col className="px-md-3" md="12">
                            <FormGroup>
                              <label>Observação</label>
                              <Input
                                type="text"
                                defaultValue={qt.observation}
                                onChange={e =>
                                  (qt.observation = e.target.value)
                                }
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              );
            })}
            {/* End quotation1 */}

            <Button className="btn-fill" color="primary" type="submit">
              {this.state.loading === false ? "Enviar Pedido" : "Aguarde ..."}
            </Button>
          </Form>
        </div>
      </>
    );
  }
}

export default UserProfile;
