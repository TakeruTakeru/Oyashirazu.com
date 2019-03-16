import { observable, computed, action, decorate } from "mobx";

class UiState {
    onLoading = false;
    modalVisible = false;

    changeModalState = () =>{
        console.log(this)
        this.modalVisible = !this.modalVisible
    }
}

export default decorate(UiState, {
    onLoading: observable,
    modalVisible: observable,
    changeModalState: action,
})