const {getNotes, postNote, deleteNote, changeStateOfNote} = require('../../src/handler/noteHandlers');
const fileOperations = require('../../src/utils/fileOperations');

describe('the getNotes handler function,', () => {  

	it('should call h.response with success message when /notes is hit with GET', async () => {
		const mockCode = jest.fn();
		const mockH = {
			response: jest.fn(() => {
				return {
					code: mockCode
				};
			})
		};
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockReadFromNotesResponse = {
			notes: [
				{
					title: 'New Note',
					description: 'Injected note',
					noteId: 'rtfhy7w',
					isActive: true
				}
			] 
		};
		mockReadFromNotes.mockResolvedValue(mockReadFromNotesResponse);
		await getNotes(null, mockH);
		expect(mockH.response).toHaveBeenCalledWith(mockReadFromNotesResponse);
		expect(mockCode).toHaveBeenCalledWith(200);
		mockReadFromNotes.mockRestore();
	});

	it('should return a statusCode: 500 when the file read fails', async (done) => {
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		mockReadFromNotes.mockRejectedValue(new Error('Read file failed'));
		const mockCode = jest.fn();
		const mockH = {
			response: jest.fn(() => ({ 
				code: mockCode 
			}))
		};
		await getNotes(null, mockH);
		expect(mockCode).toHaveBeenCalledWith(500);
		expect(mockH.response).toHaveBeenCalledWith('Read file failed');
		mockReadFromNotes.mockRestore();
		done();
	});

});

describe('the postNote handler function,', () => {  

	it('should call h.response with success message when /notes is hit with POST', async (done) => {
		const mockRequest = {
			payload: {
				title: 'Note new',
				description: 'Note new description'
			}
		};
		const mockCode = jest.fn();
		const mockH = {
			response: jest.fn(() => {
				return{
					code: mockCode
				};
			})
		};	
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockWriteToNotes = jest.spyOn(fileOperations, 'writeToNotes');
		const mockReadFromNotesResponse = {
			notes: [
				{
					title: 'New Note',
					description: 'Injected note',
					noteId: 'rtfhy7w',
					isActive: true
				}
			] 
		};
		mockReadFromNotes.mockResolvedValue(mockReadFromNotesResponse);
		mockWriteToNotes.mockResolvedValue();
		await postNote(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('Note added');
		expect(mockCode).toHaveBeenCalledWith(200);
		mockReadFromNotes.mockRestore();
		mockWriteToNotes.mockRestore();
		done();
	});

	it('should return statusCode: 500 adding new note fails', async (done) => {
		const mockRequest = {
			payload: {
				title: 'Note new',
				description: 'Note new description'
			}
		};
		const mockCode = jest.fn();
		const mockH = {
			response: jest.fn(() => {
				return{
					code: mockCode
				};
			})
		};	
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockWriteToNotes = jest.spyOn(fileOperations, 'writeToNotes');
		const mockReadFromNotesResponse = {
			notes: [
				{
					title: 'New Note',
					description: 'Injected note',
					noteId: 'rtfhy7w',
					isActive: true
				}
			] 
		};
		mockReadFromNotes.mockResolvedValue(mockReadFromNotesResponse);
		mockWriteToNotes.mockRejectedValue(new Error('Failed to add note'));
		await postNote(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('Failed to add note');
		expect(mockCode).toHaveBeenCalledWith(500);
		mockReadFromNotes.mockRestore();
		mockWriteToNotes.mockRestore();
		done();
	});

});

describe('the deleteNote handler function,', () => {  

	it('should call h.response with success message when /notes/{id} is hit with DELETE', async (done) => {
		const mockRequest = {
			params: {
				id: 'tb018tp'
			}
		};
		const codeMock = jest.fn();
		const mockH = {
			response: jest.fn(() => {
				return{
					code: codeMock
				};
			})
		};
		const mockReadFromNotesResponse = {
			notes: [
				{
					title: 'New Note',
					description: 'Injected note',
					noteId: 'rtfhy7w',
					isActive: true
				}
			] 
		};		
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockWriteToNotes = jest.spyOn(fileOperations, 'writeToNotes');
		mockReadFromNotes.mockResolvedValue(mockReadFromNotesResponse);
		mockWriteToNotes.mockResolvedValue();
		await deleteNote(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('Note deleted');
		expect(codeMock).toHaveBeenCalledWith(200);
		mockReadFromNotes.mockRestore();
		mockWriteToNotes.mockRestore();
		done();
	});

	it('should return statusCode: 500 when delete action fails', async (done) => {
		const mockRequest = {
			params: {
				id: 'tb018tp'
			}
		};
		const codeMock = jest.fn();
		const mockH = {
			response: jest.fn(() => {
				return{
					code: codeMock
				};
			})
		};
		const mockReadFromNotesResponse = {
			notes: [
				{
					title: 'New Note',
					description: 'Injected note',
					noteId: 'rtfhy7w',
					isActive: true
				}
			] 
		};		
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockWriteToNotes = jest.spyOn(fileOperations, 'writeToNotes');
		mockReadFromNotes.mockResolvedValue(mockReadFromNotesResponse);
		mockWriteToNotes.mockRejectedValue(new Error ('Note delete failed'));
		await deleteNote(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('Note delete failed');
		expect(codeMock).toHaveBeenCalledWith(500);
		mockReadFromNotes.mockRestore();
		mockWriteToNotes.mockRestore();
		done();
	});

});

describe('the changeStateOfNote handler function,', () => {  

	it('should call h.response with success message when /notes/{id} is hit with PUT', async (done) => {
		const mockRequest = {
			params: {
				id: 'gaqa5v6'
			}
		};
		const codeMock = jest.fn();
		const mockH = {
			response: jest.fn(() => {
				return{
					code: codeMock
				};
			})
		};
		const mockReadFromNotesResponse = {
			notes: [
				{
					title: 'New Note',
					description: 'Injected note',
					noteId: 'rtfhy7w',
					isActive: true
				}
			] 
		};	
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockWriteToNotes = jest.spyOn(fileOperations, 'writeToNotes');
		mockReadFromNotes.mockResolvedValue(mockReadFromNotesResponse);
		mockWriteToNotes.mockResolvedValue();
		await changeStateOfNote(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('State changed');
		expect(codeMock).toHaveBeenCalledWith(200);
		mockReadFromNotes.mockRestore();
		mockWriteToNotes.mockRestore();
		done();
	});

	it('should return statusCode: 500 note is failed to be updated', async (done) => {
		const mockRequest = {
			params: {
				id: 'gaqa5v6'
			}
		};
		const codeMock = jest.fn();
		const mockH = {
			response: jest.fn(() => {
				return{
					code: codeMock
				};
			})
		};
		const mockReadFromNotesResponse = {
			notes: [
				{
					title: 'New Note',
					description: 'Injected note',
					noteId: 'rtfhy7w',
					isActive: true
				}
			] 
		};	
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockWriteToNotes = jest.spyOn(fileOperations, 'writeToNotes');
		mockReadFromNotes.mockResolvedValue(mockReadFromNotesResponse);
		mockWriteToNotes.mockRejectedValue(new Error ('State change failed'));
		await changeStateOfNote(mockRequest, mockH);
		expect(mockH.response).toHaveBeenCalledWith('State change failed');
		expect(codeMock).toHaveBeenCalledWith(500);
		mockReadFromNotes.mockRestore();
		mockWriteToNotes.mockRestore();
		done();
	});


});
