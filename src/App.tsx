/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import type {
  DataTablePageEvent,
  DataTableSelectionMultipleChangeEvent,
} from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import type { InputNumberValueChangeEvent } from 'primereact/inputnumber';

import Navbar from './components/Navbar';
import type { Artwork } from './types/artwork';
import { fetchArtworks } from './services/artwork';

export default function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const [first, setFirst] = useState(0);
  const [rows] = useState(12);
  const [page, setPage] = useState(1);

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [rowSelection, setRowSelection] = useState<Artwork[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const overlayRef = useRef<OverlayPanel>(null);
  const [selectCount, setSelectCount] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchArtworks(page, rows);
        setArtworks(response.data);
        setTotalRecords(response.pagination.total);

        const selectedOnPage = response.data.filter(row =>
          selectedIds.has(row.id)
        );
        setRowSelection(selectedOnPage);
      } catch {
        setError('Failed to load artworks');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page, rows]);

  const onPageChange = (event: DataTablePageEvent) => {
    setFirst(event.first);
    if (event.page !== undefined) {
      setPage(event.page + 1);
    }
  };

  const applyCustomSelection = () => {
    if (!selectCount || selectCount <= 0) return;

    const capped = Math.min(selectCount, artworks.length);
    const newIds = new Set(selectedIds);
    const newRowSelection = [...rowSelection];

    for (let i = 0; i < capped; i++) {
      const row = artworks[i];
      if (!newIds.has(row.id)) {
        newIds.add(row.id);
        newRowSelection.push(row);
      }
    }

    setSelectedIds(newIds);
    setRowSelection(newRowSelection);
    setSelectCount(null);
    overlayRef.current?.hide();
  };

  const onSelectionChange = (
    e: DataTableSelectionMultipleChangeEvent<Artwork[]>
  ) => {
    const selectedRows = e.value;
    const newSet = new Set<number>();

    selectedIds.forEach(id => {
      const existsOnPage = artworks.some(a => a.id === id);
      if (!existsOnPage) {
        newSet.add(id);
      }
    });

    selectedRows.forEach(row => newSet.add(row.id));

    setSelectedIds(newSet);
    setRowSelection(selectedRows);
  };

  return (
    <>
      <Navbar />

      <div className="p-4">
        <div className="mb-3 flex gap-2 align-items-center">
          <Button
            label="Select Custom..."
            onClick={e => overlayRef.current?.toggle(e)}
          />
          <div className="ml-auto font-bold text-blue-600">
            {selectedIds.size} Selected
          </div>
        </div>

        <OverlayPanel ref={overlayRef}>
          <div className="flex flex-column gap-3 w-15rem">
            <span className="font-medium text-sm text-500">
              Select rows (Current Page)
            </span>
            <div className="p-inputgroup">
              <InputNumber
                value={selectCount}
                onValueChange={(e: InputNumberValueChangeEvent) =>
                  setSelectCount(e.value ?? null)
                }
                placeholder="Qty"
                min={1}
                max={artworks.length}
                autoFocus
              />
              <Button label="Apply" onClick={applyCustomSelection} />
            </div>
          </div>
        </OverlayPanel>

        <DataTable
          value={artworks}
          lazy
          paginator
          first={first}
          rows={rows}
          totalRecords={totalRecords}
          onPage={onPageChange}
          loading={loading}
          dataKey="id"
          selection={rowSelection}
          onSelectionChange={onSelectionChange}
          selectionMode="checkbox"
          emptyMessage={error ?? 'No records found'}
          showGridlines
          stripedRows
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: '3rem' }}
          />
          <Column field="title" header="Title" />
          <Column field="place_of_origin" header="Place of Origin" />
          <Column field="artist_display" header="Artist" />
          <Column field="inscriptions" header="Inscriptions" />
          <Column field="date_start" header="Start" />
          <Column field="date_end" header="End" />
        </DataTable>
      </div>
    </>
  );
}
