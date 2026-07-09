let ioInstance;

module.exports = {
  init: (io) => {
    ioInstance = io;
    io.on('connection', (socket) => {
      console.log('Socket connected:', socket.id);
      
      socket.on('join', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined their room`);
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
      });
    });
  },
  getIO: () => {
    if (!ioInstance) {
      throw new Error('Socket.io not initialized!');
    }
    return ioInstance;
  }
};
