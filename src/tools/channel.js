export default class Channel {
	constructor(typeName) {
		this.typeName = typeName || "MSG";
		this.bcl = null;
	}
	create(cb) {
		if ("BroadcastChannel" in window) {
			this.bcl = new BroadcastChannel(this.typeName);
			this.bcl.addEventListener("message", cb);
		}
	}
	close(cb) {
		if (this.bcl) {
			this.bcl.removeEventListener("message", cb);
			this.bcl.close();
			this.bcl = null;
		}
	}
	sender(msg) {
		if (this.bcl) {
			this.bcl.postMessage(msg || "");
		}
	}
}
