
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import Home from '../app/page';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Home Component', () => {
  beforeEach(() => {
    // Reset localStorage before each test
    localStorage.clear();
  });

  test('renders initial message when no memo is selected', () => {
    render(<Home />);
    expect(screen.getByText('メモを選択するか、新しいメモを作成してください。')).toBeInTheDocument();
  });

  test('creates a new memo when "新しいメモ" button is clicked', () => {
    render(<Home />);
    
    const newMemoButton = screen.getByRole('button', { name: /新しいメモ/ });
    fireEvent.click(newMemoButton);

    // Check if the new memo title appears in the sidebar
    // We use getAllByText because the button also has the same text.
    // The first one should be the button, the second one should be the sidebar item.
    expect(screen.getAllByText('新しいメモ')[1]).toBeInTheDocument();

    // Check if the editor is displayed
    expect(screen.getByPlaceholderText('タイトル')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ここにメモを入力してください..')).toBeInTheDocument();
  });

  test('deletes a memo when "削除" button is clicked', () => {
    render(<Home />);

    // 1. Create a new memo
    const newMemoButton = screen.getByRole('button', { name: /新しいメモ/ });
    fireEvent.click(newMemoButton);

    // Ensure the memo is created
    expect(screen.getAllByText('新しいメモ')[1]).toBeInTheDocument();

    // 2. Delete the memo
    const deleteButton = screen.getByRole('button', { name: '削除' });
    fireEvent.click(deleteButton);

    // Ensure the memo is deleted and the initial message is back
    expect(screen.queryByText('新しいメモ', { selector: 'span' })).not.toBeInTheDocument();
    expect(screen.getByText('メモを選択するか、新しいメモを作成してください。')).toBeInTheDocument();
  });

  test('updates memo title and content', () => {
    render(<Home />);

    // 1. Create a new memo
    const newMemoButton = screen.getByRole('button', { name: /新しいメモ/ });
    fireEvent.click(newMemoButton);

    // 2. Edit title
    const titleInput = screen.getByPlaceholderText('タイトル') as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

    // 3. Edit content
    const contentTextarea = screen.getByPlaceholderText('ここにメモを入力してください..') as HTMLTextAreaElement;
    fireEvent.change(contentTextarea, { target: { value: 'Updated content.' } });

    // Check if the values in the inputs are updated
    expect(titleInput.value).toBe('Updated Title');
    expect(contentTextarea.value).toBe('Updated content.');

    // Check if the title in the sidebar is also updated
    expect(screen.getByText('Updated Title')).toBeInTheDocument();
  });

  test('deletes all memos when "すべてのメモを削除" button is clicked', () => {
    // Mock window.confirm
    const confirmSpy = vi.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(() => true);

    render(<Home />);

    // 1. Create two memos
    const newMemoButton = screen.getByRole('button', { name: /新しいメモ/ });
    fireEvent.click(newMemoButton);
    fireEvent.click(newMemoButton);

    // Ensure memos are created (we'll have multiple '新しいメモ' texts)
    expect(screen.getAllByText('新しいメモ').length).toBeGreaterThan(2);

    // 2. Click the delete all button
    const deleteAllButton = screen.getByRole('button', { name: /すべてのメモを削除/ });
    fireEvent.click(deleteAllButton);

    // 3. Assertions
    expect(confirmSpy).toHaveBeenCalled();
    expect(screen.queryByText('新しいメモ', { selector: 'span' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /すべてのメモを削除/ })).not.toBeInTheDocument();
    expect(screen.getByText('メモを選択するか、新しいメモを作成してください。')).toBeInTheDocument();

    // Clean up spy
    confirmSpy.mockRestore();
  });

  test('saves active memo to a file when "メモを保存" button is clicked', () => {
    // Mock URL methods on window.URL
    Object.defineProperty(window.URL, 'createObjectURL', {
      writable: true,
      value: vi.fn(() => 'blob:mock-url'),
    });
    Object.defineProperty(window.URL, 'revokeObjectURL', {
      writable: true,
      value: vi.fn(),
    });

    const createObjectURLSpy = vi.spyOn(window.URL, 'createObjectURL');
    const revokeObjectURLSpy = vi.spyOn(window.URL, 'revokeObjectURL');

    // Mock HTMLAnchorElement.prototype.click to prevent JSDOM navigation warning
    const originalAnchorClick = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = vi.fn(); // Mock the click method

    // Mock document.createElement('a') to return a real anchor element
    const originalCreateElement = document.createElement; // Save original
    let mockAnchor: HTMLAnchorElement;
    const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'a') {
        mockAnchor = originalCreateElement.call(document, 'a') as HTMLAnchorElement; // Call original for 'a'
        return mockAnchor;
      }
      return originalCreateElement.call(document, tagName); // Call original for other tags
    });


    render(<Home />);

    // 1. Create a new memo and set its content
    const newMemoButton = screen.getByRole('button', { name: /新しいメモ/ });
    fireEvent.click(newMemoButton);

    const titleInput = screen.getByPlaceholderText('タイトル') as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: 'Test Memo Title' } });

    const contentTextarea = screen.getByPlaceholderText('ここにメモを入力してください..') as HTMLTextAreaElement;
    fireEvent.change(contentTextarea, { target: { value: 'This is the content of the test memo.' } });

    // 2. Click the save button
    const saveButton = screen.getByRole('button', { name: /メモを保存/ });
    fireEvent.click(saveButton);

    // 3. Assertions
    expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
    expect(createObjectURLSpy).toHaveBeenCalledWith(expect.any(Blob));

    // Verify Blob content (optional, but good for robustness)
    const blobArg = createObjectURLSpy.mock.calls[0][0];
    expect(blobArg.type).toBe('text/plain;charset=utf-8');

    // Assertions for anchor element creation and download
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockAnchor.href).toBe('blob:mock-url');
    expect(mockAnchor.download).toBe('Test Memo Title.txt');
    expect(mockAnchor.click).toHaveBeenCalledTimes(1); // Assert that the mocked click was called

    expect(revokeObjectURLSpy).toHaveBeenCalledTimes(1);
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock-url');

    // Clean up spies and restore original methods
    createObjectURLSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
    createElementSpy.mockRestore();
    HTMLAnchorElement.prototype.click = originalAnchorClick; // Restore original click method
  });
});
