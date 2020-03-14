import React from "react";
import PriceQuotations from "../components/Oder/PriceQuotations";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Row,
  Col
} from "reactstrap";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchase: [{ createUser: 1, observation: "teste" }],
      Quotations: [
        {
          link: "http://quotation1.com",
          unitValue: 0,
          purchaseItem: "",
          amount: 0,
          totalValue: 0,
          file: ""
        },
        {
          link: "http://teste.com.be",
          unitValue: 0,
          purchaseItem: "",
          amount: 0,
          totalValue: 0,
          file: ""
        },
        {
          link: "http://teste.com.be",
          unitValue: 0,
          purchaseItem: "",
          amount: 0,
          totalValue: 0,
          file: ""
        }
      ]
    };
  }

  render() {
    return (
      <>
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
                        <label>Area</label>
                        <Input
                          defaultValue="Informatica"
                          disabled
                          placeholder="Informatica"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="6">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          defaultValue={sessionStorage.getItem("userName")}
                          placeholder="Username"
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Descricao do Produto</label>
                        <Input
                          placeholder="Digite uma breve descricao"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {this.state.Quotations.map((qt, i) => {
            return <PriceQuotations key={i} nOrder={i + 1} />;
          })}

          <Button className="btn-fill" color="primary">
            Save
          </Button>
        </div>
      </>
    );
  }
}

export default UserProfile;
