import React, { Component } from "react";
import {
  Input,
  Button,
  Icon,
  Modal,
  Popconfirm,
  message,
  InputNumber,
  Rate
} from "antd";

export default class AccountingPage extends Component {
  addItem = e => {
    const { value } = e.target;
    this.props.store.accounting.addItem(value);
  };

  deleteItemsList = () => {
    this.props.store.accounting.deleteItems();
    message.success("completed delete all items!");
  };

  onChangeFee = (number, item) => {
      this.props.store.accounting.onChangeFee(item.name, number);
  }

  doSettlement = (item) => {
    this.props.store.accounting.doSettlement(item.name);
  }

  render() {
    const { getItems } = this.props.store.accounting;

    const items = getItems.map(item => {
      return item;
    });

    return (
      <div id="home-component">
        <InputItem onPressEnter={this.addItem} />
        <CustomPopConfirm
          title="delete items?"
          onConfirm={this.deleteItemsList}
          onText="delete completed!"
        >
          <ClearButton />
        </CustomPopConfirm>
        <ListItems
         items={items}
         onChangeFee={this.onChangeFee}
         doSettlement={this.doSettlement}
         />
      </div>
    );
  }
}

const InputItem = ({ onPressEnter }) => {
  return (
    <Input type="text" className="" allowClear onPressEnter={onPressEnter} />
  );
};

const ListItems = ({ items, onChangeFee, doSettlement }) => {
  const item = items.map((item, idx) => (
    <li key={idx}>
      {item.name}
      <ItemRate>
        <InputNumber
          step={100}
          defaultValue={0}
          formatter={value =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={value => value.replace(/\$\s?|(,*)/g, "")}
          onChange={number => onChangeFee(number, item)}
          disabled={item.isConfirmed}
        />
        <Button type="primary" onClick={() => doSettlement(item)}>
          Confirm
        </Button>
      </ItemRate>
      {item.fee}
    </li>
  ));
  return <ul>{item}</ul>;
};

const ClearButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <Icon type="delete" /> clear
    </Button>
  );
};

const ModalExample = ({ title, visible, onOk, onCancel }) => {
  return (
    <Modal
      title="Basic Modal"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

const CustomPopConfirm = ({
  children,
  title,
  onConfirm,
  onCancel,
  okText,
  cancelText
}) => {
  return (
    <Popconfirm
      title={title}
      placement="rightBottom"
      onConfirm={onConfirm}
      onCancel={onCancel}
      okText="Yes"
      cancelText="No"
    >
      {children}
    </Popconfirm>
  );
};

const ItemRate = ({ children, rate = 0 }) => {
  return (
    <div>
      {children}
      <Rate value={rate} />
    </div>
  );
};
