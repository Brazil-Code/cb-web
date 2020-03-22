import React from "react";
import PriceQuotations from "../components/PriceQuotation/PriceQuotations";
import Quotation from "../services/order/priceQuotations";
import userService from "../services/login";
import NotificationAlert from "react-notification-alert";

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
  Spinner
} from "reactstrap";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      observation: "",
      purchase: { createUser: userService.getId() },
      Quotations: [],
      maxQuotations: [1, 2, 3, 4, 5],
      numQuotation: [1, 2, 3],
      loading: false
    };
    this.addQuotations = this.addQuotations.bind(this);
    this.FinishQuotations = this.FinishQuotations.bind(this);
    this.addPurchase = this.addPurchase.bind(this);
    this.validations = this.validations.bind(this);
  }

  async addPurchase() {
    let purchase = await {
      ...this.state.purchase,
      purchaseItem: this.state.observation
    };
    this.setState({ purchase });
    console.log(this.state.purchase);
  }
  validations() {
    let error = [];
    if (this.state.Quotations.length < 3) {
      error.push("por favor inserir no minimo 3 cotacoes");
    }
    return error;
  }

  addQuotations(data) {
    let Quotations = [];
    let equats = false;
    Quotations.push(...this.state.Quotations);

    Quotations.map(qt => {
      if (qt.key === data.key) {
        qt.link = data.link;
        qt.unitValue = data.unitValue;
        qt.observation = data.observation;
        qt.amount = data.amount;
        qt.totalValue = data.totalValue;
        qt.file = data.file;
        equats = true;
      }
    });
    if (equats === false) {
      Quotations.push(data);
    }
    this.setState({ Quotations });
    console.log(this.state.Quotations);
  }

  FinishQuotations() {
    this.setState({ loading: true });
    let error = this.validations();
    if (error.length > 0) {
      error.map(error => {
        this.notify("tr", "danger", error);
        this.setState({ loading: false });
      });
      return;
    } else {
      let priceQuotations = this.state.Quotations;
      let obj = { ...this.state.purchase, priceQuotations };
      console.log(obj);
      Quotation.addQuotations(obj)
        .then(sucess => {
          if (sucess.status === 201) {
            this.notify(
              "tr",
              "info",
              "Pedido de Compra registrado com sucesso."
            );
          }
          this.setState({ loading: false });
        })
        .catch(error => {
          console.log(error);
          this.notify(
            "tr",
            "danger",
            "verifique todos os campos e tente novamente."
          );
          this.setState({ loading: false });
        });
    }
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
      autoDismiss: 3
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
                          defaultValue="Informatica"
                          disabled
                          type="text"
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
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Descrição do produto:</label>
                        <Input
                          placeholder="Observações gerais sobre o produto"
                          type="text"
                          value={this.state.observation}
                          onChange={e =>
                            this.setState({ observation: e.target.value })
                          }
                        />
                      </FormGroup>
                      <Button
                        className="btn-fill"
                        size="sm"
                        color="primary"
                        onClick={this.addPurchase}
                      >
                        salvar
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* componente aqui */}
          {this.state.numQuotation.map(qt => {
            return (
              <PriceQuotations
                addQuotations={this.addQuotations}
                nQuotation={qt}
                key={qt}
              />
            );
          })}

          <Button
            className="btn-fill"
            color="info"
            onClick={this.FinishQuotations}
          >
            {this.state.loading === false ? "Enviar Pedido" : "Aguarde ..."}
          </Button>
        </div>
      </>
    );
  }
}

export default UserProfile;
