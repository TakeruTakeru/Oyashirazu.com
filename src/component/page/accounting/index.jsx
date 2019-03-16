import React, { Component } from "react";
import {
  Input,
  Button,
  Icon,
  Modal,
  Popconfirm,
  message,
  Rate,
  Empty,
  Statistic,
} from "antd";
import { ServerAdapter } from "../../../api/adapter";

export default class AccountingPage extends Component {
  componentDidMount() {
    ServerAdapter.post().then(res => {
      console.log(res);
    });
  }

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
  };

  onChangeRate = (item, value) => {
    this.props.store.accounting.onChangeRate(item.name, value);
  };

  doSettlement = item => {
    this.props.store.accounting.doSettlement(item.name);
  };

  deleteItem = item => {
    this.props.store.accounting.deleteItem(item.name);
  };

  render() {
    const { modalVisible, changeModalState } = this.props.store.uiState;
    const { getItems, getTotalPrice } = this.props.store.accounting;
    const items = getItems.map(item => {
      return item;
    });

    return (
      <div id="home-component">
        <div className="accounting-item-input">
          <InputItem onPressEnter={this.addItem} />
        </div>
        <CustomPopConfirm
          title="delete items?"
          onConfirm={this.deleteItemsList}
          onText="delete completed!"
        >
          <div className="accounting-clear-button">
            <ClearButton />
          </div>
        </CustomPopConfirm>
        <TotalPriceDisplay items={items} totalPrice={getTotalPrice}></TotalPriceDisplay>
        <ListItems
          items={items}
          onChangeFee={this.onChangeFee}
          onChangeRate={this.onChangeRate}
          doSettlement={this.doSettlement}
          deleteItem={this.deleteItem}
        />
        <PreviewModal items={items} visible={modalVisible} onCancel={changeModalState} totalPrice={getTotalPrice}/>
        <Button icon={'copy'} onClick={changeModalState}></Button>
      </div>
    );
  }
}

const InputItem = ({ disabled, onChange, onPressEnter, allowClear = true }) => {
  return (
    <div className="input-mobile">
      <Input
        type="text"
        allowClear
        onPressEnter={onPressEnter}
        onChange={onChange}
        disabled={disabled}
        allowClear={allowClear}
      />
    </div>
  );
};

const ListItems = ({
  items,
  onChangeFee,
  doSettlement,
  onChangeRate,
  deleteItem
}) => {
  if (items.length < 1) return <EmptyDisplay />;
  const item = items.map((item, idx) => (
    <li className="list list-borderd" key={idx}>
      <h3 className="item-name">{item.name}</h3>
     <PriceDisplay price={item.fee} />
      <ItemRate
        onChange={value => onChangeRate(item, value)}
        disabled={item.isConfirmed}
      >
        <div className="input-number">
          <InputItem
            disabled={item.isConfirmed}
            onChange={e => onChangeFee(e.target.value, item)}
            allowClear={false}
          />
        </div>
        <Button
          disabled={item.isConfirmed}
          type="primary"
          onClick={() => doSettlement(item)}
        >
          Confirm
        </Button>
        <div className="item-delete-button">
          <ClearButton
            disabled={item.isConfirmed}
            onClick={() => deleteItem(item)}
          />
        </div>
      </ItemRate>
     
    </li>
  ));
  return <ul>{item}</ul>;
};

const ClearButton = ({
  onClick,
  text,
  className = "delete-icon",
  spin = false,
  disabled = false
}) => {
  return (
    <Button disabled={disabled} className={className} onClick={onClick}>
      <Icon style={{ color: "white" }} type="delete" theme="outlined" />
      {text}
    </Button>
  );
};

const PreviewModal = ({ title, visible, onOk, onCancel, items, totalPrice }) => {
  //ant designのmessage componentで初回の呼び出しが効かないためフラグを立てる。
  let messageDebugger = true;
  //記録されたitemをテキストベースにフォーマットし、クリップボードへコピーする。
  //line共有用。
  function copy() {
    messageDebugger ? message.success() : messageDebugger = false;
    const items = document.getElementsByClassName("copy-items")
    let text = document.createElement('textarea');
    text.value = items[0].innerText;
    document.body.appendChild(text);
    text.select()
    document.execCommand('copy')
    text.parentElement.removeChild(text)
    message.success('コピーしました！Lineに貼ってね！')
    onCancel();
  }
  const ItemList = items.map((item, idx) => {
    return(
    <li className="list" key={idx}>
      {item.name}が{item.fee}円
    </li>)
  })
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={copy}
      onCancel={onCancel}
    >
    <h3>お会計プレビュー</h3>
    <ul className="copy-items">
      {ItemList}
      合計金額は{totalPrice}円です。
    </ul>
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
      placement="bottom"
      onConfirm={onConfirm}
      onCancel={onCancel}
      okText="Yes"
      cancelText="No"
    >
      {children}
    </Popconfirm>
  );
};

const ItemRate = ({ children, onChange, disabled }) => {
  return (
    <div>
      {children}
      <Rate onChange={onChange} disabled={disabled} />
    </div>
  );
};

const PriceDisplay = ({ price }) => {
  const style = price > 1000 ? { color: '#FD151B'} : {color: "#136F63"}
  return (
    <div>
      <Statistic value={price} suffix={'円'} valueStyle={style}></Statistic>
    </div>
  )
};

const TotalPriceDisplay = ({ items, totalPrice }) => {
  return (
    <div>
      <PriceDisplay price={totalPrice} />
    </div>
  )
}

const EmptyDisplay = () => {
  return (
    <div className="imao-wrapper">
      <Empty image="../../../static/imao.jpg" />
    </div>
  );
};
