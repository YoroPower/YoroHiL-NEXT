import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL); // Flask 服务器地址

interface DeviceData {
    value: number;
}

// 获取设备数据的函数
export const fetchDeviceData = async (): Promise<DeviceData> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/device`);
    const data = await response.json();
    return data;
};

// 监听设备更新事件的函数
export const onDeviceUpdate = (callback: (data: DeviceData) => void) => {
    socket.on('device_update', callback);
};

// 取消监听设备更新事件的函数
export const offDeviceUpdate = () => {
    socket.off('device_update');
};

export default socket;