import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Row,
  Col,
  Button
} from "reactstrap";
class PriceQuotations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: this.props.nOrder,
      link: "http://quotation1.com",
      unitValue: "",
      purchaseItem: "",
      amount: "",
      totalValue: 0,
      file: ""
    };
    this.totalValue = this.totalValue.bind(this);
    this.addQuotations = this.addQuotations.bind(this);
  }

  totalValue = () => {
    this.setState({ totalValue: this.state.amount * this.state.unitValue });
  };

  async addQuotations() {
    let data = {
      key: await this.state.key,
      link: await this.state.link,
      unitValue: await this.state.unitValue,
      purchaseItem: await this.state.purchaseItem,
      amount: await this.state.amount,
      totalValue: await this.state.totalValue,
      file: await this.state.file
    };
    await this.props.addQuotations(data);
  }

  render() {
    return (
      <Row onClick={this.totalValue}>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">Ordem {this.props.nOrder}</h5>
            </CardHeader>
            <CardBody>
              <Row>
                <Col className="pr-md-1" md="3">
                  <FormGroup>
                    <label>link URL:</label>
                    <Input
                      placeholder="http://expemplo.com/produto"
                      type="text"
                      value={this.state.link}
                      onChange={e => this.setState({ link: e.target.value })}
                    />
                  </FormGroup>
                </Col>
                <Col className="px-md-1" md="3">
                  <FormGroup>
                    <label>Preço</label>
                    <Input
                      placeholder="R$:"
                      value={this.state.unitValue}
                      onChange={e =>
                        this.setState({ unitValue: e.target.value })
                      }
                      name="price"
                      type="number"
                    />
                  </FormGroup>
                </Col>
                <Col className="px-md-1" md="3">
                  <FormGroup>
                    <label>Quantidade</label>
                    <Input
                      placeholder="Quantidade de prudtudo"
                      type="text"
                      value={this.state.amount}
                      type="number"
                      onChange={e => this.setState({ amount: e.target.value })}
                    />
                  </FormGroup>
                </Col>
                <Col className="px-md-1" md="3">
                  <FormGroup>
                    <label>Total</label>
                    <Input
                      type="text"
                      value={this.state.totalValue}
                      onChange={e =>
                        this.setState({ totalValue: e.target.value })
                      }
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col className="px-md-3" md="12">
                  <FormGroup>
                    <label>Observacao</label>
                    <Input
                      type="text"
                      value={this.state.purchaseItem}
                      onChange={e =>
                        this.setState({ purchaseItem: e.target.value })
                      }
                    />
                  </FormGroup>
                  <Button
                    size="sm"
                    className="btn-fill"
                    color="wait"
                    onClick={this.addQuotations}
                  >
                    salvar
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default PriceQuotations;
